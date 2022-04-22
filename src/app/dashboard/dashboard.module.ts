import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { GetPokemonsResolver } from './resolvers/get-pokemons.service';
import { ContainerComponent } from './container/container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { FavoritesIndicatorComponent } from './favorites-indicator/favorites-indicator.component';

@NgModule({
  declarations: [
    ContainerComponent,
    FavoritesIndicatorComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    GetPokemonsResolver
  ],
  exports: [
    ContainerComponent
  ]
})
export class DashboardModule { }
