import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Post, PostCreateDto} from "../interface/post.interface";

@Injectable({
  providedIn: 'root'
})

export class PostService {
  baseApiUrl = 'https://icherniakov.ru/yt-course/'
  #http = inject(HttpClient)

  createPost(payload: PostCreateDto){
    return this.#http.post<Post>(`${this.baseApiUrl}post/`, payload)
  }
}
