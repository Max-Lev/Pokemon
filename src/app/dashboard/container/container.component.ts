import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import { PokemonModel } from 'src/app/core/models/pokemon.model';
import { SharedService } from 'src/app/shared/providers/shared.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContainerComponent implements OnInit, AfterViewInit, OnDestroy {

  pokemonsList$: Observable<PokemonModel[]>;
  pokemonsList: PokemonModel[] = [];
  counter: number = 0;
  sub$ = new Subject<boolean>();

  constructor(private activatedRoute: ActivatedRoute, private changeDetector: ChangeDetectorRef, private router: Router,
    private sharedService: SharedService) {

  }

  ngOnInit(): void {
    this.getPokemons$();
    this.favoritesIndicator();
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    this.sub$.next(false);
    this.sub$.complete();
  }

  /**
   * @description get view model data from route resolver
   */
  getPokemons$() {
    this.activatedRoute.data.pipe(takeUntil(this.sub$)).subscribe((data: Data) => {
      if (this.sharedService.favorite.length) {
        this.pokemonsList$ = this.sharedService.updateFavoritesModel(data.getPokemons.pokemons);
      } else {
        this.pokemonsList$ = of(data.getPokemons.pokemons);
      }
      this.pokemonsList = data.getPokemons.pokemons;
      this.changeDetector.detectChanges();
    });
  }

  /**
   * @description navigate to details route
   * @param event nav event
   */
  navFavHandler(event: { action: string }) {
    this.router.navigate(['dashboard/favorites'])
  }

  /**
   * @description add item to favorites
   * @param pokemon selected model
   */
  addFavHandler(pokemon: PokemonModel) {
    this.sharedService.selectFavorite(pokemon);
    this.pokemonsList$ = this.sharedService.updateFavoritesModel(this.pokemonsList);
    this.favoritesIndicator();
  }

  /**
   * @description remove item from favorites
   * @param pokemon selected model
   */
  removeFavHandler(pokemon: PokemonModel) {
    this.sharedService.unSelectFavorite(pokemon);
    this.pokemonsList$ = this.sharedService.updateFavoritesModel(this.pokemonsList);
    this.favoritesIndicator();
  }

  /**
   * @description display favorites count
   */
  favoritesIndicator() {
    this.counter = this.sharedService.favorite.length;
    this.changeDetector.detectChanges();
  }

  /**
   * @description navigate to details
   * @param pokemon model for details route
   */
  detailsHandler(pokemon: PokemonModel) {
    this.router.navigate(['details', pokemon.id], { state: { pokemon: pokemon }, relativeTo: this.activatedRoute });
  }

}
