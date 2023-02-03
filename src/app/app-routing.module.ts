import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchEventComponent } from './components/event/search-event.component';
import { HomeComponent } from './components/home/home.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { SearchUserComponent } from './components/user/search-user.component';
import { UserGuardGuard } from './user-guard.guard';

const routes: Routes = [
  { path: '.', component: UserLoginComponent },
  { path: 'home', component: HomeComponent, canActivate:  [UserGuardGuard]},
  { path: 'event', component: SearchEventComponent, canActivate:  [UserGuardGuard]},
  { path: 'user', component: SearchUserComponent, canActivate:  [UserGuardGuard]},
  { path: 'user-login', component: UserLoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
