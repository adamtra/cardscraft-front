import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [    
    ErrorDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  entryComponents: [
    ErrorDialogComponent
  ]
})
export class SharedModule { }
