import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ProfileCardComponent} from "./comp-ref/profile-card/profile-card.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProfileCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Blog';
}
