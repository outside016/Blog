import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PostCreateDto} from "../interface/post.interface";
import {Profile} from "../interface/profile.interface";

@Injectable({
  providedIn: 'root'
})

export class PostService {
  baseApiUrl = 'https://icherniakov.ru/yt-course/'
  #http = inject(HttpClient)

  createPost(payload: PostCreateDto){
    return this.#http.post<Profile>(`${this.baseApiUrl}/post/`, payload)
  }
}
