import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPanelViewComponent } from './admin-panel-view/admin-panel-view.component';
import { CardFormComponent } from './card-form/card-form.component';


const routes: Routes = [
  {
    path: '',
    component: AdminPanelViewComponent,
  },
  {
    path: 'card/:id',
    component: CardFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
