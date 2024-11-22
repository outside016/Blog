import {Component, inject, Renderer2} from '@angular/core';
import {AvatarCircleComponent} from "../../../comp-ref/avatar-circle/avatar-circle.component";
import {ProfileService} from "../../../data/services/profile.service";
import {NgIf} from "@angular/common";
import {SvgIconComponent} from "../../../comp-ref/svg-icon/svg-icon.component";
import {PostService} from "../../../data/services/post.service";
import {FormsModule} from "@angular/forms";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-post-input',
  standalone: true,
  imports: [
    AvatarCircleComponent,
    NgIf,
    SvgIconComponent,
    FormsModule
  ],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss'
})
export class PostInputComponent {
  r2 = inject(Renderer2)
  postService = inject(PostService);
  profile = inject(ProfileService).me
  postText = ''

  onTextAreaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;

    this.r2.setStyle(textarea, 'height', 'auto' );
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
  }

  onCreatePost(){
      if(!this.postText) return

    firstValueFrom(this.postService.createPost({
      title: 'Клевый пост',
      content: this.postText,
      authorId: this.profile()!.id
    })).then(()=>{
      this.postText = ''
    })
  }
}
