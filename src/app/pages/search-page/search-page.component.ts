import {Component, inject} from '@angular/core';
import {ProfileCardComponent} from "../../comp-ref/profile-card/profile-card.component";
import {ProfileService} from "../../data/services/profile.service";
import {Profile} from "../../data/interface/profile.interface";
import {ProfileFiltersComponent} from "./profile-filters/profile-filters.component";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [
    ProfileCardComponent,
    ProfileFiltersComponent,
    AsyncPipe
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {

  profileService = inject(ProfileService);

  profiles = this.profileService.filteredProfiles

  constructor() {

  }
}
