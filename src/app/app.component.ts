import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ProfileCardComponent} from "./comp-ref/profile-card/profile-card.component";
import {ProfileService} from "./data/services/profile.service";
import {Profile} from "./data/interface/profile.interface";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProfileCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  profileService = inject(ProfileService);

  profiles: Profile[] = [];

  constructor() {
    this.profileService.getTestAccounts()
      .subscribe(val => {
        this.profiles = val
      })
  }
}
