import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { buttons } from 'src/app/global/buttons-bar';
import { buttonsBar } from 'src/app/models/buttons.model';
import { ButtonStatusService } from 'src/app/services/buttonStatus.service';
@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss']
})
export class BottomBarComponent implements OnInit {
  buttons: buttonsBar[]=[];
  path:string='';
  private unsubscribe$ = new Subject<void>();

  constructor(private buttonStatus: ButtonStatusService) {
    this.buttons = buttons
  }

  ngOnInit() {
    this.buttonStatus.buttonStatus$.subscribe(path => { this.path = path })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
