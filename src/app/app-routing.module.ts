import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsernameResolver } from './username/username.resolver';

const routes: Routes = [
  { path: 'enter', loadComponent: () => import('./enter/enter.component').then(c => c.EnterComponent) },
  { path: ':username', loadComponent: () => import('./username/username.component').then(c => c.UsernameComponent), resolve: { props: UsernameResolver } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
