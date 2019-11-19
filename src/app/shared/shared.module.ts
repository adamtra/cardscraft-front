import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { MaterialModule } from '../material.module';
import { UiLoaderComponent } from './ui-loader/ui-loader.component';



@NgModule({
  declarations: [    
    ErrorDialogComponent,
    UiLoaderComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  entryComponents: [
    ErrorDialogComponent
  ],
  exports: [
    UiLoaderComponent,
  ],
})
export class SharedModule { }
