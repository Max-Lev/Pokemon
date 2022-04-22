import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Observable, of, pipe } from 'rxjs';
import { PokemonModel, PokemonsContainer } from 'src/app/core/models/pokemon.model';
import { DOCUMENT } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  pokemons$ = new BehaviorSubject<PokemonsContainer>(new PokemonsContainer());

  favorite$ = new BehaviorSubject<PokemonModel[]>([]);

  favorite: PokemonModel[] = [];

  private window: Window;

  constructor(@Inject(Window) private document: Window) {
    this.window = this.document;
    this.getStorage();
  }

  /**
   * @description get stored items
   */
  getStorage() {
    const storage = { ...this.window.localStorage };
    const keys = Object.keys(storage);
    const pokeKeys = keys.filter(key => key.startsWith('pokemon'));
    pokeKeys.map(key => {
      const item = JSON.parse(this.window.localStorage.getItem(key) || '{}');
      this.favorite.push(item);
      this.favorite$.next(this.favorite);
    });
  }

  /**
   * @description store items to favorites
   * add items to favorites observable 
   */
  selectFavorite(pokemon: PokemonModel): PokemonModel {
    if (this.favorite.length < 5) {
      const favPokemon = { ...pokemon, ...{ isFavorite: true, disableAll: false } };
      this.favorite.push(favPokemon);
      this.favorite$.next(this.favorite);
      this.window.localStorage.setItem(`pokemon-${favPokemon.id}`, JSON.stringify(favPokemon));
    }
    return { ...pokemon, ...{ isFavorite: true } };
  }
  /**
   * @description remove item from favorites
   */
  unSelectFavorite(pokemon: PokemonModel): PokemonModel {
    this.favorite = this.favorite.filter(pok => pok.id !== pokemon.id);
    console.log(this.favorite)
    this.favorite$.next(this.favorite);
    this.window.localStorage.removeItem(`pokemon-${pokemon.id}`);
    return { ...pokemon, ...{ isFavorite: false } };
  }

  /**
   * @description disable/enable add-to-favorites-btn
   * @param pokemonsList view model
   */
  updateFavoritesModel(pokemonsList: PokemonModel[]): Observable<PokemonModel[]> {
    if (this.favorite.length < 5) {
      return of(
        pokemonsList.map((pok: PokemonModel) => {
          const selected = this.favorite.some((fav: PokemonModel) => fav.id === pok.id);
          if (selected) {
            return { ...pok, ...{ isFavorite: true, disableAll: false } };
          } else {
            return pok;
          }
        })
      );
    } else {

      return of(
        pokemonsList.map((pokemon: PokemonModel) => {
          const selected = this.favorite.some((fav: PokemonModel) => fav.id === pokemon.id);
          if (selected) {
            return { ...pokemon, ...{ isFavorite: true, disableAll: false } };
          } else {
            return { ...pokemon, ...{ isFavorite: false, disableAll: true } };
          }
        })
      );
    }

  }


}
