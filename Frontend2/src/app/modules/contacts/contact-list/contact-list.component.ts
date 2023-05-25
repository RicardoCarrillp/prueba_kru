import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { buttons } from 'src/app/global/buttons-list';
import { buttonsList } from 'src/app/models/buttons.model';
import { Result } from 'src/app/models/result.model';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  buttonList!:buttonsList[];
  contactList!: any;
  loading!:boolean;
  private unsubscribe$ = new Subject<void>();

  constructor(private contactsService: ContactsService) {
    this.buttonList = buttons
  }

  ngOnInit() {
    this.loading = true
    this.contactsService.getContacts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((contacts:Result) => {
        console.log(contacts.data);
        if (contacts.status===200) {
          this.contactList = contacts.data;
          this.loading = false
        }else{
          console.log(contacts.data)
          this.loading = false
        }

      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
