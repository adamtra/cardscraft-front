import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPanelViewComponent } from './admin-panel-view/admin-panel-view.component';


const routes: Routes = [
  {
    path: '',
    component: AdminPanelViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
