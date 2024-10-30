import { Component } from '@angular/core';
import {SvgIconComponent} from "../../../comp-ref/svg-icon/svg-icon.component";

@Component({
  selector: 'app-avatar-upload',
  standalone: true,
  imports: [
    SvgIconComponent
  ],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss'
})
export class AvatarUploadComponent {

  fileBrowserHandler(event: Event){
    const file = (event.target as HTMLInputElement)?.files?.[0];

    if (!file || !file.type.match('image')) return
  }

}
