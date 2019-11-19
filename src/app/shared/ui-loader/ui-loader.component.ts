import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-ui-loader',
  templateUrl: './ui-loader.component.html',
  styleUrls: ['./ui-loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiLoaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
