import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomeResolver } from './home/home.resolver';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent, resolve: { props: HomeResolver } },
  { path: 'enter', loadComponent: () => import('./enter/enter.component').then(c => c.EnterComponent) },
  { path: 'admin/:slug', loadComponent: () => import('./admin/admin-post/admin-post.component').then(c => c.AdminPostComponent) },
  { path: 'admin', loadComponent: () => import('./admin/admin.component').then(c => c.AdminComponent) },
  { path: '404', component: PageNotFoundComponent },
  { path: ':username/:slug', loadChildren: () => import('./post/post.module').then(m => m.PostModule) },
  { path: ':username', loadChildren: () => import('./username/username.module').then(m => m.UsernameModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
