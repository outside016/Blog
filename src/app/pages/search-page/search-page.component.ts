import {Component, inject} from '@angular/core';
import {ProfileCardComponent} from "../../comp-ref/profile-card/profile-card.component";
import {ProfileService} from "../../data/services/profile.service";
import {Profile} from "../../data/interface/profile.interface";

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [
    ProfileCardComponent
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {

  profileService = inject(ProfileService);

  profiles: Profile[] = [];

  constructor() {
    this.profileService.getTestAccounts()
      .subscribe(val => {
        this.profiles = val
      })
  }
}
