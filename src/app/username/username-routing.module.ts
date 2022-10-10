import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsernameComponent } from './username.component';
import { UsernameResolver } from './username.resolver';

const routes: Routes = [
  { path: '', component: UsernameComponent, resolve: { props: UsernameResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsernameRoutingModule { }
