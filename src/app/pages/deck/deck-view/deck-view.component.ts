import { Component, OnInit } from '@angular/core';
import { DeckService } from 'src/app/services/deck.service';
import { Deck } from 'src/app/interfaces';
import { MatDialog } from '@angular/material';
import { DeckDialogComponent } from '../deck-dialog/deck-dialog.component';

@Component({
  selector: 'app-deck-view',
  templateUrl: './deck-view.component.html',
  styleUrls: ['./deck-view.component.scss']
})
export class DeckViewComponent implements OnInit {

  public decks: Deck[];

  constructor(
    private dialog: MatDialog,
    private deck: DeckService) { }

  ngOnInit() {
    this.getDecks();
  }

  getDecks() {
    this.deck.getAll().subscribe((data) => {
      this.decks = data;
    });
  }

  add() {
    const dialogRef = this.dialog.open(DeckDialogComponent, {
      data: null,
    });
    
    dialogRef.afterClosed().subscribe((data) => {
      if (data) { 
        this.getDecks();
      }
    });
  }

  edit(deckData: Deck) {
    const dialogRef = this.dialog.open(DeckDialogComponent, {
      data: deckData,
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.getDecks();
      }
    });
  }

}
