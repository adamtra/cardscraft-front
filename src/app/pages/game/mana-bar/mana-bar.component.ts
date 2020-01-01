import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-mana-bar',
  templateUrl: './mana-bar.component.html',
  styleUrls: ['./mana-bar.component.scss']
})
export class ManaBarComponent implements OnChanges {

  @Input() value = 0;
  @Input() max = 0;
  @Input() showDots = true;

  public dots = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.value.currentValue !== null || changes.max.currentValue !== null) {
      this.paintDots();
    }
  }

  paintDots() {
    this.dots = [];
    for (let i = 0; i < this.max; i++) {
      if (i < this.value) {
        this.dots.push(1);
      } else {
        this.dots.push(0);
      }
    }
  }
}
