import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { SharedService } from './providers/shared.service';


@NgModule({
  declarations: [
    PokemonCardComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatBadgeModule,
    MatIconModule
  ],
  exports: [
    MatCardModule,
    MatButtonModule,
    PokemonCardComponent,
    MatBadgeModule,
    MatIconModule
  ],
  providers: [
    { provide: Window, useValue: window }
  ]
})
export class SharedModule {
  /**
   * @description singleton shared service
   */
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        SharedService
      ]
    };
  }
}
