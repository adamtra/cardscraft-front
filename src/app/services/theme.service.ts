import { Injectable } from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(public overlay: OverlayContainer) { }

  setTheme(theme: string) {
    if (theme === '') {
      theme = 'dark-theme';
    }
    if (theme === 'dark-theme') {
      this.overlay.getContainerElement().classList.remove('light-theme');
      this.overlay.getContainerElement().classList.add('dark-theme');
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
    } else if (theme === 'light-theme') {
      this.overlay.getContainerElement().classList.remove('dark-theme');
      this.overlay.getContainerElement().classList.add('light-theme');
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
    }
    localStorage.setItem('theme', theme);
  }
}
