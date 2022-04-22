import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import { PokemonModel } from 'src/app/core/models/pokemon.model';
import { SharedService } from 'src/app/shared/providers/shared.service';

@Component({
  selector: 'app-favorites-container',
  templateUrl: './favorites-container.component.html',
  styleUrls: ['./favorites-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesContainerComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private sharedService: SharedService, private changeDetector: ChangeDetectorRef, private router: Router) { }

  pokemons: PokemonModel[] = [];

  sub$ = new Subject<boolean>();

  ngOnInit(): void {
    this.getFavorites$();
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    this.sub$.next(false);
    this.sub$.complete();
  }

  /**
   * @description observe added favorites items
   */
  getFavorites$(): void {
    this.sharedService.favorite$.pipe(takeUntil(this.sub$)).subscribe((pokemon: PokemonModel[]) => {
      this.pokemons = pokemon;
      this.changeDetector.detectChanges();
    });
  }
  /**
   * @description remove model
   */
  removeFavHandler(pokemon: PokemonModel) {
    this.sharedService.unSelectFavorite(pokemon);
  }
  /**
   * @description nav to dashboard
   */
  navHome(): void {
    this.router.navigate(['/dashboard']);
  }
  /**
   * @description navigate to model details by model id
   */
  detailsHandler(pokemon: PokemonModel) {
    this.router.navigate(['dashboard/details', pokemon.id], { state: { pokemon: pokemon } });
  }

}
