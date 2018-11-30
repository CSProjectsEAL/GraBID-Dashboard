import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchComponent } from './search/search.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/404/1', pathMatch: 'full' },
  { path: 'dashboard', redirectTo: '/404/2', pathMatch: 'full' },
  { path: 'dashboard/:id', component: DashboardComponent },
  { path: 'dashboard/:id/:mode', component: DashboardComponent },
  { path: 'query', component: SearchComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '404/:id', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }