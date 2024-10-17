import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";
import {TokenResponse} from "./auth.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient)

  baseApiUrl = 'https://icherniakov.ru/yt-course/auth/'

  accessToken: string | null = null

  refreshToken: string | null = null

  get isAuth(){
    return !!this.accessToken;
  }


  login(payload: { username: string, password: string }) {

    const fd = new FormData();

    fd.append('username', payload.username);
    fd.append('password', payload.password);

    return this.http.post<TokenResponse>(
      `${this.baseApiUrl}token`,
      fd,
    ).pipe(
      tap(val => {
        this.accessToken = val.accessToken
        this.refreshToken = val.refreshToken
      })
    )

  }

}
