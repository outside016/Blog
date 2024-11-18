import {inject, Injectable, signal} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Post, PostCreateDto} from "../interface/post.interface";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class PostService {
  baseApiUrl = 'https://icherniakov.ru/yt-course/'
  #http = inject(HttpClient)

  posts = signal<Post[]>([])

  createPost(payload: PostCreateDto){
    return this.#http.post<Post>(`${this.baseApiUrl}post/`, payload)
  }

  fetchPosts(){
    return this.#http.get<Post[]>(`${this.baseApiUrl}post/`)
      .pipe(
      tap( res => this.posts.set(res))
      )
  }
}
