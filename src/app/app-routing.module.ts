import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ActivitiesComponent} from './components/managerActivity/activities.component';
import {HomeComponent} from './components/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'activities', component: ActivitiesComponent},
  {path: '*', redirectTo: "activities"},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
