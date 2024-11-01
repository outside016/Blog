import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from "@angular/common/http";
import {inject} from "@angular/core";
import {BehaviorSubject, catchError, filter, switchMap, tap, throwError} from "rxjs";
import {AuthService} from "./auth.service";

let isRefreshing$ = new BehaviorSubject<boolean>(false)

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  const token = authService.token

  if (!token) return next(req)

  if (isRefreshing$.value) {
    return refreshAndProced(authService, req, next)
  }

  return next(addToken(req, token))
    .pipe(
      catchError(error => {
        if (error.status === 403) {
          return refreshAndProced(authService, req, next)
        }

        return throwError(error)
      })
    )
}
const refreshAndProced = (
  authService: AuthService,
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  if (!isRefreshing$) {
    //@ts-ignore
    isRefreshing$.next(true)
    return authService.refreshAuthToken()
      .pipe(
        switchMap((res) => {

          return next(addToken(req, res.access_token))
            .pipe(
              //@ts-ignore
            tap((token) => isRefreshing$.next(false))
            )
        })
      )
  }

  if (req.url.includes('refresh')) return next(addToken(req, authService.token!))

    return isRefreshing$.pipe(
      filter(isRefreshing => !isRefreshing),
      switchMap(res => {
        return next(addToken(req, authService.token!))
      })
    )
}

const addToken = (req: HttpRequest<any>, token: string) => {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  })
}
