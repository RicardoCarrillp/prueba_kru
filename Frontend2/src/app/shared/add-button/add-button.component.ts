import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss']
})
export class AddButtonComponent implements OnInit {

  constructor(private route: Router,private activatedroute: ActivatedRoute) { }

  ngOnInit() {
  }

  goToCreate() {
    this.route.navigate(['new'], { relativeTo: this.activatedroute });
  }

}
