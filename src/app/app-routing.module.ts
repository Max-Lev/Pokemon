import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'preferences',loadChildren:()=>import('./preferences/preferences.module')
  },
  {
    path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(module => module.DashboardModule),
  },
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      initialNavigation:'enabled'
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
