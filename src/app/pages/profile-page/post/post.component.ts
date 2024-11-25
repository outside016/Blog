import {Component, inject, input, OnInit, signal} from '@angular/core';
import {PostComment, Post} from "../../../data/interface/post.interface";
import {AvatarCircleComponent} from "../../../comp-ref/avatar-circle/avatar-circle.component";
import {PostService} from "../../../data/services/post.service";
import {DatePipe} from "@angular/common";
import {SvgIconComponent} from "../../../comp-ref/svg-icon/svg-icon.component";
import {PostInputComponent} from "../post-input/post-input.component";
import {CommentComponent} from "./comment/comment.component";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    AvatarCircleComponent,
    DatePipe,
    SvgIconComponent,
    PostInputComponent,
    CommentComponent
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit{
  post = input<Post>();

  comments = signal<PostComment[]>([])

  postService = inject(PostService);

  async ngOnInit() {
    this.comments.set(this.post()!.comments)
  }

  async onCreated(){
    const comments = await firstValueFrom(this.postService.getCommentByPostId(this.post()!.id))

    this.comments.set(comments)
  }

}
