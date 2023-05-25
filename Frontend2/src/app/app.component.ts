import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonStatusService } from './services/buttonStatus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  path!: string;
  constructor(private router: Router, private location: Location,
    private buttonStatus: ButtonStatusService) {

  }
  async ngOnInit() {
    await this.router.events.subscribe(() => {
      if (this.location.path() != '') {
        this.path = this.location.path();
      } else {
        this.path = 'Home'
      }
    });
    this.buttonStatus.changePath(this.path)
  }

}
