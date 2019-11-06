import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelViewComponent } from './admin-panel-view/admin-panel-view.component';
import { AdminPanelCardTableComponent } from './admin-panel-card-table/admin-panel-card-table.component';
import { MaterialModule } from 'src/app/material.module';
import { CardFormComponent } from './card-form/card-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminPanelViewComponent,
    AdminPanelCardTableComponent,
    CardFormComponent,
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class AdminPanelModule { }
