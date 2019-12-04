import { Component, OnInit, Inject } from '@angular/core';
import { Deck } from 'src/app/interfaces';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-deck-dialog',
  templateUrl: './deck-dialog.component.html',
  styleUrls: ['./deck-dialog.component.scss']
})
export class DeckDialogComponent implements OnInit {

  public deckForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DeckDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Deck,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.dialogRef.updateSize('600px');
    this.deckForm = this.fb.group({
      name: ['', Validators.required],
    });
    if (this.data) {
      this.deckForm.get('name').setValue(this.data.name);
    }
  }

  close() {
    this.dialogRef.close(0);
  }

  delete() {

  }

  save() {

  }

  get isDisabled() {
    return this.deckForm.invalid;
  }

}
