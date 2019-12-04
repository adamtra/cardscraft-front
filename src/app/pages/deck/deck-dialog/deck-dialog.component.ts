import { Component, OnInit, Inject } from '@angular/core';
import { Deck } from 'src/app/interfaces';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DeckService } from 'src/app/services/deck.service';

@Component({
  selector: 'app-deck-dialog',
  templateUrl: './deck-dialog.component.html',
  styleUrls: ['./deck-dialog.component.scss']
})
export class DeckDialogComponent implements OnInit {

  public deckForm: FormGroup;
  
  private sending = false;

  constructor(
    public dialogRef: MatDialogRef<DeckDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Deck,
    private fb: FormBuilder,
    private deck: DeckService) { }

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
    this.deck.delete(this.data.id).subscribe(() => {
      this.dialogRef.close(1);
    });
  }

  save() {
    this.sending = true;
    if (this.data) {
      this.deck.edit(this.data.id, this.deckForm.value).subscribe(() => {
        this.dialogRef.close(1);
      }, () => {
        this.sending = false;
      });
    } else {
      this.deck.add(this.deckForm.value).subscribe(() => {
        this.dialogRef.close(1);
      }, () => {
        this.sending = false;
      });
    }
  }

  get isDisabled() {
    return this.deckForm.invalid || this.sending;
  }

}
