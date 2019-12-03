import { Component, OnInit } from '@angular/core';
import { DeckService } from 'src/app/services/deck.service';
import { Deck } from 'src/app/interfaces';

@Component({
  selector: 'app-deck-view',
  templateUrl: './deck-view.component.html',
  styleUrls: ['./deck-view.component.scss']
})
export class DeckViewComponent implements OnInit {

  public decks: Deck[];

  constructor(private deck: DeckService) { }

  ngOnInit() {
    this.getDecks();
  }

  getDecks() {
    this.deck.getAll().subscribe((data) => {
      this.decks = data;
    });
  }

}
