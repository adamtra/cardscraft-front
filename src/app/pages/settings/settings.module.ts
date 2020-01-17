import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingViewComponent } from './setting-view/setting-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [SettingViewComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
    MaterialModule,
  ]
})
export class SettingsModule { }
