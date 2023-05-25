import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { buttons } from 'src/app/global/buttons-list';
import { buttonsList } from 'src/app/models/buttons.model';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  buttonList!:buttonsList[];
  contactList!: any;
  private unsubscribe$ = new Subject<void>();

  constructor(private contactsService: ContactsService) {
    this.buttonList = buttons
  }

  ngOnInit() {
    this.contactsService.getContacts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(contacts => this.contactList = contacts);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
