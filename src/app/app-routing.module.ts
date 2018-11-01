import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowPostComponent } from './show-post/show-post.component'; 
// เรียกใช้ ShowPostComponent 

const routes: Routes = [
  {path: '', component: ShowPostComponent}, // แสดง ShowPostComponent บน url directory /
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
