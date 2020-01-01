import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameManagerComponent } from './game-manager/game-manager.component';


const routes: Routes = [
  {
    path: '',
    component: GameManagerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
