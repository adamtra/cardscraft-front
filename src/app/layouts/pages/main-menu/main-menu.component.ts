import { Component, OnInit } from '@angular/core';
import { shadeColor } from 'src/app/shared/variables';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  public hovered: number;
  public menuOptions = [
    {
      'name': 'Graj',
    },
    {
      'name': 'Zarządzaj taliami',
    },
    {
      'name': 'Ustawienia',
    },
  ];

  private color = '#2196F3';

  constructor() { }

  ngOnInit() {
  }

  normalStyle() {
    return {
      backgroundColor: this.color,
    };
  }

  hoveredStyle() {
    return {
      backgroundColor: shadeColor(this.color, -10),
    };
  }

}
