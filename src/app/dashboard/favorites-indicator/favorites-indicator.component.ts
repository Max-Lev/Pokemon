import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-favorites-indicator',
  templateUrl: './favorites-indicator.component.html',
  styleUrls: ['./favorites-indicator.component.scss']
})
export class FavoritesIndicatorComponent implements OnInit {

  @Output() navFavEmitter: EventEmitter<{ action: string }> = new EventEmitter();

  @Input() counter:number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  navFav() {
    this.navFavEmitter.emit({ action: 'FAVORITES_NAVIGATE' })
  }

}
