import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-card-image',
  templateUrl: './card-image.component.html',
  styleUrls: ['./card-image.component.scss'],
})
export class CardImageComponent implements OnChanges {

  @Input() id: number;
  file = null;

  constructor(private card: CardService) { }

  getImage() {
    this.card.getImage(this.id).subscribe((data) => {
      this.createImageFromBlob(data);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.id.currentValue !== null) {
      this.getImage();
    }
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.file = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }

}
