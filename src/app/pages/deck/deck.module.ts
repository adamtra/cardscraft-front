import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeckRoutingModule } from './deck-routing.module';
import { DeckViewComponent } from './deck-view/deck-view.component';


@NgModule({
  declarations: [DeckViewComponent],
  imports: [
    CommonModule,
    DeckRoutingModule
  ]
})
export class DeckModule { }
