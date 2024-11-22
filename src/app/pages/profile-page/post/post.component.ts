import {Component, inject, input, signal} from '@angular/core';
import {Post} from "../../../data/interface/post.interface";
import {AvatarCircleComponent} from "../../../comp-ref/avatar-circle/avatar-circle.component";
import {PostService} from "../../../data/services/post.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    AvatarCircleComponent,
    DatePipe
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  post = input<Post>();


  postService = inject(PostService);
}
