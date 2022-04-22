import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { PokemonModel } from 'src/app/core/models/pokemon.model';
import { PokimonHttpService } from 'src/app/core/providers/pokemon-http.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonDetailsResolverService implements Resolve<PokemonModel> {

  constructor(private router: Router, private pokimonHttpService: PokimonHttpService) {

  }
  /**
   * @description load data for details route
   * if model missing initial model data => navigate to dashboard page
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PokemonModel> {

    const pokemon: PokemonModel = this.router.getCurrentNavigation()?.extras.state?.pokemon;

    if (pokemon === undefined) {
      this.router.navigate(['dashboard']);
      return of(pokemon);
    } else {
      return this.pokimonHttpService.getDetailsData$(route.params['id'], pokemon);
    }
  }
}
