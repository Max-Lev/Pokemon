import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PokemonModel, PokemonsContainer } from 'src/app/core/models/pokemon.model';
import { PokimonHttpService } from 'src/app/core/providers/pokemon-http.service';
import { SharedService } from 'src/app/shared/providers/shared.service';

@Injectable({
  providedIn: 'root'
})
export class GetPokemonsResolver implements Resolve<PokemonsContainer> {

  constructor(private pociponHttpService: PokimonHttpService, private sharedService: SharedService) {

  };

  /**
   * @description get data for activated route:
   * prevent additional server request in case data been loaded once
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PokemonsContainer> {
    if (this.pociponHttpService.pokemons$.getValue().pokemons.length > 0) {
      return of(this.pociponHttpService.pokemons$.getValue());
    } else {
      return this.pociponHttpService.getData$(route.data.limit);
    }
  }
}
