import {Routes} from '@angular/router';
import {SearchPageComponent} from "./pages/search-page/search-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {ProfilePageComponent} from "./pages/profile-page/profile-page.component";
import {LayoutComponent} from "./comp-ref/layout/layout.component";
import {canActivateAuth} from "./auth/access.guard";
import {SettingsPageComponent} from "./pages/settings-page/settings-page.component";

export const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {path: '', redirectTo: 'profile/me', pathMatch: 'full'},
      {path: 'search', component: SearchPageComponent},
      {path: 'profile/:id', component: ProfilePageComponent},
      {path: 'settings', component: SettingsPageComponent},
      {
        path: 'chats',
      }
    ],canActivate: [canActivateAuth]
  },
  {path: 'login', component: LoginPageComponent},


];
