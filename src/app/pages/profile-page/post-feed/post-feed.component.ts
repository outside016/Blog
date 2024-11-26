import {Component, ElementRef, HostListener, inject, Renderer2} from '@angular/core';
import {PostInputComponent} from "../post-input/post-input.component";
import {PostComponent} from "../post/post.component";
import {PostService} from "../../../data/services/post.service";
import {firstValueFrom, fromEvent} from "rxjs";

@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [
    PostInputComponent,
    PostComponent
  ],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss'
})
export class PostFeedComponent {

  postService = inject(PostService);

  feed = this.postService.posts;

  r2 = inject(Renderer2)

  hostElement = inject(ElementRef);

  @HostListener('window:resize')
  onWindowResize() {
    this.resizeFeed()
  }

  constructor() {
    firstValueFrom(this.postService.fetchPosts());
  }

  ngAfterViewInit() {
this.resizeFeed()

    fromEvent(window, 'resize')
      .subscribe(()=>{
        console.log(231)
      })
  }

  resizeFeed(){
    {
      const {top} = this.hostElement.nativeElement.getBoundingClientRect();

      const height: number = window.innerHeight - top - 24 - 24
      this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
      console.log(height)
    }
  }

}
