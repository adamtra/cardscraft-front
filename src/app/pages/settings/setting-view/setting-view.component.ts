import { Component, OnInit, ViewChild } from '@angular/core';
import { AvatarComponent } from 'src/app/shared/avatar/avatar.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-setting-view',
  templateUrl: './setting-view.component.html',
  styleUrls: ['./setting-view.component.scss']
})
export class SettingViewComponent implements OnInit {

  @ViewChild('image', { static: true }) image: AvatarComponent;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  changeImage(image: File) {
    this.image.file = null;
    this.userService.setAvatar(image).subscribe(() => {
      this.image.getImage();
    });
  }

}
