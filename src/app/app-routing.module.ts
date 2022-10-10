import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'enter', loadComponent: () => import('./enter/enter.component').then(c => c.EnterComponent) },
  { path: ':username', loadChildren: () => import('./username/username.module').then(m => m.UsernameModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
