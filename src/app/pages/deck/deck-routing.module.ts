import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeckViewComponent } from './deck-view/deck-view.component';


const routes: Routes = [
  {
    path: '',
    component: DeckViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeckRoutingModule { }
