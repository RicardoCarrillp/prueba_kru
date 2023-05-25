import { Component, OnInit } from '@angular/core';
import { buttons } from 'src/app/global/buttons-bar';
import { buttonsBar } from 'src/app/models/buttons.model';
@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss']
})
export class BottomBarComponent implements OnInit {
  buttons!: buttonsBar[];
  value: any;
  constructor() {
    this.buttons = buttons
  }

  ngOnInit() {
  }

}
