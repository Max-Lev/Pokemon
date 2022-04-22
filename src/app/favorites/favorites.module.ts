import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesContainerComponent } from './favorites-container/favorites-container.component';
import { SharedModule } from '../shared/shared.module';
const routes: Routes = [
  {
    path: '', component: FavoritesContainerComponent
  }
];

@NgModule({
  declarations: [
    FavoritesContainerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class FavoritesModule {

}
