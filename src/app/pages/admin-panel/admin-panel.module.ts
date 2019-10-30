import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelViewComponent } from './admin-panel-view/admin-panel-view.component';
import { AdminPanelCardTableComponent } from './admin-panel-card-table/admin-panel-card-table.component';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    AdminPanelViewComponent,
    AdminPanelCardTableComponent,
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    MaterialModule,
  ]
})
export class AdminPanelModule { }
