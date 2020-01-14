import { Component, OnInit, Input } from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { Card } from 'src/app/interfaces';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {

  @Input() id: number;
  @Input() showHealth = false;
  @Input() lostHealth = 0;
  @Input() disabled = false;

  public cardData: Card;

  constructor(private card: CardService) { }

  ngOnInit() {
    this.card.get(this.id).subscribe((data) => {
      this.cardData = data;
    });
  }

}
