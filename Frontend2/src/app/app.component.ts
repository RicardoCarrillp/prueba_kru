import { Location } from '@angular/common';
import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonStatusService } from './services/buttonStatus.service';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from './services/alert.service';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  path!: string;
  loading: boolean = false;
  constructor(private router: Router, private location: Location, private alertService: AlertService,
    private buttonStatus: ButtonStatusService, private toastr: ToastrService, private loadingService: LoadingService, private cdRef: ChangeDetectorRef) {

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

    this.alertService.alert$.subscribe(data => {
      if (data.type === 'success') {
        this.toastr.success(data.message, "", {
          positionClass: 'toast-bottom-center',
          progressBar: true
        });
      } else {
        this.toastr.error(data.message, "", {
          positionClass: 'toast-bottom-center',
          progressBar: true
        });
      }
    })
    this.loadingService.loading$.subscribe((loading: boolean) => {
      console.log(loading);

      this.loading = loading;
    })
  }

  ngAfterViewChecked(){
    this.cdRef.detectChanges();

  }



}
