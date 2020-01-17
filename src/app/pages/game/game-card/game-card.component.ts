import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { Card } from 'src/app/interfaces';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit, OnChanges {

  @Input() id: number;
  @Input() showHealth = false;
  @Input() currentHealth = 0;
  @Input() disabled = false;

  public cardData: Card;

  constructor(private card: CardService) { }

  ngOnInit() {
    this.card.get(this.id).subscribe((data) => {
      this.cardData = data;
    });
  }

  ngOnChanges(change: SimpleChanges) {
    if (change.currentHealth && change.currentHealth.currentValue > 0) {
      this.cardData.health = this.currentHealth;
    }
  }

}
