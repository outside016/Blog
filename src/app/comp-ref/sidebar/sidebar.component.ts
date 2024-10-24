import {Component, inject, OnInit} from '@angular/core';
import {SvgIconComponent} from "../svg-icon/svg-icon.component";
import {SubscriberCardComponent} from "./subscriber-card/subscriber-card.component";
import {RouterLink} from "@angular/router";
import {ProfileService} from "../../data/services/profile.service";
import {AsyncPipe, JsonPipe} from "@angular/common";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SvgIconComponent,
    SubscriberCardComponent,
    RouterLink,
    AsyncPipe,
    JsonPipe
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent{

  profileService = inject(ProfileService);

  subscribers$ = this.profileService.getSubscribersShortList();

  me = this.profileService.me;

  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: ''
    },
    {
      label: 'Чаты',
      icon: 'chats',
      link: 'chats'
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search'
    }
  ];

  ngOnInit(){
    firstValueFrom(this.profileService.getMe());
  }

}
