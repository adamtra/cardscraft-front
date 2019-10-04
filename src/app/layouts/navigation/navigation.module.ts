import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationRoutingModule } from './navigation-routing.module';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    NavigationRoutingModule,
    MaterialModule,
  ]
})
export class NavigationModule { }
