import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Profile} from "../interface/profile.interface";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  http = inject(HttpClient)

  baseApiUrl = 'http://localhost:3000'

  getTestAccounts(){
    return this.http.get<Profile[]>(`${this.baseApiUrl}/profiles`)
  }

}
