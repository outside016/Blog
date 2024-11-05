import {Component, input} from '@angular/core';
import {Profile} from "../../data/interface/profile.interface";
import {ImgUrlPipe} from "../../helpers/pipes/img-url.pipe";
import {AvatarCircleComponent} from "../avatar-circle/avatar-circle.component";

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [
    ImgUrlPipe,
    AvatarCircleComponent
  ],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss'
})
export class ProfileHeaderComponent {

  profile = input<Profile>()

}
