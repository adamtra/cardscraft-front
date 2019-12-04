import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeckRoutingModule } from './deck-routing.module';
import { DeckViewComponent } from './deck-view/deck-view.component';
import { MaterialModule } from 'src/app/material.module';
import { DeckCardTableComponent } from './deck-card-table/deck-card-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DeckDialogComponent } from './deck-dialog/deck-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [DeckViewComponent, DeckCardTableComponent, DeckDialogComponent],
  imports: [
    CommonModule,
    DeckRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  entryComponents: [DeckDialogComponent]
})
export class DeckModule { }
