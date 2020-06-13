import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RefreshComponent } from './refresh/refresh.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'refresh', component: RefreshComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
