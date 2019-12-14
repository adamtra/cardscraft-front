import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameBeginComponent } from './game-begin/game-begin.component';


const routes: Routes = [
  {
    path: '',
    component: GameBeginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
