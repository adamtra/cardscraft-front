import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameBeginComponent } from './game-begin/game-begin.component';


@NgModule({
  declarations: [GameBeginComponent],
  imports: [
    CommonModule,
    GameRoutingModule
  ]
})
export class GameModule { }
