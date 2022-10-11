import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomeResolver } from './home/home.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent, resolve: { props: HomeResolver } },
  { path: 'enter', loadComponent: () => import('./enter/enter.component').then(c => c.EnterComponent) },
  { path: ':username', loadChildren: () => import('./username/username.module').then(m => m.UsernameModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
