import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './container/details.component';
import { PokemonDetailsResolverService } from './resolvers/pokemon-details-resolver.service';


const routes: Routes = [
  {
    path: '', component: DetailsComponent,
    resolve: {
      pokemonDetails: PokemonDetailsResolverService
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DetailsRoutingModule {
}
