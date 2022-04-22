import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { GetPokemonsResolver } from './resolvers/get-pokemons.service';

const routes: Routes = [
  {
    path: '', component: ContainerComponent, resolve: { getPokemons: GetPokemonsResolver }, data: { limit: 151 },
  },
  {
    path: 'details/:id', loadChildren: () => import('../details/details.module').then(m => m.DetailsModule),
  },
  {
    path: 'favorites', loadChildren: () => import('../favorites/favorites.module').then(m => m.FavoritesModule)
  },
  {
    path: '**', redirectTo: '', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
