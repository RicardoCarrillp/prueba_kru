import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { buttons } from 'src/app/global/buttons-list';
import { buttonsList } from 'src/app/models/buttons.model';
import { Result } from 'src/app/models/result.model';
import { AlertService } from 'src/app/services/alert.service';
import { ContactsService } from 'src/app/services/contacts.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  buttonList!:buttonsList[];
  contactList!: any;
  private unsubscribe$ = new Subject<void>();

  constructor(private contactsService: ContactsService, private alertService: AlertService, private loadingService: LoadingService) {
    this.buttonList = buttons
  }

  ngOnInit() {
    this.loadingService.setLoading(true);
    this.contactsService.getContacts()
      .pipe(takeUntil(this.unsubscribe$)).subscribe({
        next:(contacts) => {
          if (contacts.status === 200) {
            this.contactList = contacts.data;
            this.loadingService.setLoading(false);
          } else {
            this.loadingService.setLoading(false);
          }
        },
        error:(err)=> {
          console.log(err)
          this.alertService.showAlert("Hubo un error en el servidor", 'error')
          this.loadingService.setLoading(false);
        },
      })
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
