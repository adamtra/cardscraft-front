import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameBeginComponent } from './game-begin/game-begin.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { GameManagerComponent } from './game-manager/game-manager.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { ManaBarComponent } from './mana-bar/mana-bar.component';
import { GameEndComponent } from './game-end/game-end.component';


@NgModule({
  declarations: [
    GameBeginComponent,
    GameBoardComponent,
    GameManagerComponent,
    ManaBarComponent,
    GameEndComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    SharedModule,
    MaterialModule,
  ]
})
export class GameModule { }
