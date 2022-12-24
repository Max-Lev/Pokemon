import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreferencesRoutingModule } from './preferences-routing.module';
import { ContainerComponent } from './container/container.component';


@NgModule({
  declarations: [
    ContainerComponent
  ],
  imports: [
    CommonModule,
    PreferencesRoutingModule
  ]
})
export class PreferencesModule { }
