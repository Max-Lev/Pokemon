import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PokemonModel } from 'src/app/core/models/pokemon.model';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit, OnChanges {

  @Input() pokemon: PokemonModel;

  @Output() addFavEmitter: EventEmitter<PokemonModel> = new EventEmitter();

  @Output() removeFavEmitter: EventEmitter<PokemonModel> = new EventEmitter();

  @Output() detailsEmitter: EventEmitter<PokemonModel> = new EventEmitter();

  @Input() displayDetailsBtn: boolean = true;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {
  }
  /**
   * @description emit event to parent container
   */
  addFavorites(pokemon: PokemonModel) {
    this.addFavEmitter.emit(pokemon);
  }
  /**
   * @description emit event to parent container
   */
  removeFavorites(pokemon: PokemonModel) {
    this.removeFavEmitter.emit(pokemon);
  }
  /**
   * @description emit event to parent container
   */
  details(pokemon: PokemonModel) {
    this.detailsEmitter.emit(pokemon);
  }

}
