import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from "@angular/common/http";
import {inject} from "@angular/core";
import {catchError, switchMap, throwError} from "rxjs";
import {AuthService} from "./auth.service";

let isRefreshing = false

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  const token = authService.token

  if (!token) return next(req)

  if (isRefreshing) {
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
  if (!isRefreshing) {
    isRefreshing = true
    return authService.refreshAuthToken()
      .pipe(
        switchMap((res) => {
          isRefreshing = false
          return next(addToken(req, res.access_token))
        })
      )
  }

  return next(addToken(req, authService.token!))
}

const addToken = (req: HttpRequest<any>, token: string) => {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  })
}