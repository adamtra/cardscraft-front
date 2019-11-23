import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss']
})
export class InputFileComponent {

  @Output() fileSelected = new EventEmitter();

  @ViewChild('fileInput', {static: true}) fileInput: ElementRef;

  constructor() { }

  onFileSelected(event: any) {
    this.fileSelected.emit(event.target.files[0]);
  }

}
