import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { MaterialModule } from '../material.module';
import { UiLoaderComponent } from './ui-loader/ui-loader.component';
import { CardImageComponent } from './card-image/card-image.component';
import { CardDialogComponent } from './card-dialog/card-dialog.component';
import { InputFileComponent } from './input-file/input-file.component';
import { AvatarComponent } from './avatar/avatar.component';



@NgModule({
  declarations: [
    ErrorDialogComponent,
    UiLoaderComponent,
    CardImageComponent,
    CardDialogComponent,
    InputFileComponent,
    AvatarComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  entryComponents: [
    ErrorDialogComponent,
    CardDialogComponent
  ],
  exports: [
    UiLoaderComponent,
    CardImageComponent,
    InputFileComponent,
    AvatarComponent,
  ],
})
export class SharedModule { }
