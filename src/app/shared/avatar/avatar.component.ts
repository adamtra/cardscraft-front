import { Component, OnInit, Input, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnChanges {

  @Input() id: number | null;
  @Input() inGame = false;
  file = null;

  constructor(
    private user: UserService,
    private el: ElementRef) { }


  getImage() {
    if (typeof this.id === 'number' && this.id !== 0) {
      this.user.getAvatar(this.id).subscribe((data) => {
        if (data.type === 'image/png') {
          this.createImageFromBlob(data);
        }
      });
    } else if (this.id === null) {
      this.user.getMyAvatar().subscribe((data) => {
        if (data.type === 'image/png') {
          this.createImageFromBlob(data);
        }
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.id) {
      this.getImage();
    }
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.file = reader.result;
      if (this.inGame) {
        this.el.nativeElement.style.backgroundImage = `url("${this.file}")`;
      }
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }

}
