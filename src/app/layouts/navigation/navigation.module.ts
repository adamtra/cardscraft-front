import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationRoutingModule } from './navigation-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { MainMenuComponent } from 'src/app/pages/main-menu/main-menu.component';


@NgModule({
  declarations: [
    MainMenuComponent,
  ],
  imports: [
    CommonModule,
    NavigationRoutingModule,
    MaterialModule,
  ]
})
export class NavigationModule { }
