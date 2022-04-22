import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonModel } from 'src/app/core/models/pokemon.model';
import { SharedService } from 'src/app/shared/providers/shared.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent implements OnInit, AfterViewInit {

  pokemon: PokemonModel;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private sharedService: SharedService) {
  }

  ngOnInit(): void {
    this.setPokemon();
  }

  ngAfterViewInit(): void {

  }
  /**
   * @description set details data from activated route
   */
  setPokemon() {
    const pokemonDetails = this.activatedRoute.snapshot.data.pokemonDetails;
    this.pokemon = { ...pokemonDetails };
  }
  /**
   * @description remove model from favorites action handler
   */
  removeFavHandler(pokemon: PokemonModel) {
    this.pokemon = this.sharedService.unSelectFavorite(pokemon);
  }

  /**
   * @description add model to favorites action handler
   */
  addFavHandler(pokemon: PokemonModel) {
    this.pokemon = this.sharedService.selectFavorite(pokemon);
  }
  /**
   * @description navigate to dashboard route
   */
  navHome(): void {
    this.router.navigate(['/dashboard']);
  }

}
