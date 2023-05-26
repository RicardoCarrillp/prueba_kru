import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { buttons } from 'src/app/global/buttons-list';
import { buttonsList } from 'src/app/models/buttons.model';
import { Result } from 'src/app/models/result.model';
import { AlertService } from 'src/app/services/alert.service';
import { ContactsService } from 'src/app/services/contacts.service';
import { LoadingService } from 'src/app/services/loading.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { DeleteModalComponent } from 'src/app/shared/modals/delete-modal/delete-modal.component';
import { Contacts } from 'src/app/models/contact.model';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  buttonList!: buttonsList[];
  contactList!: Contacts[];
  loading:boolean = false;
  @Output() cleanInputSearch: EventEmitter<() => void> = new EventEmitter<() => void>();


  private unsubscribe$ = new Subject<void>();

  constructor(private contactsService: ContactsService, private alertService: AlertService,
    private loadingService: LoadingService, public dialog: MatDialog, private searchService: SearchService) {
    this.buttonList = buttons

    this.searchService.searchResults$.subscribe(results => {
      this.contactList = results;
    });
  }

  ngOnInit() {
    this.getContacts();
    this.loadingService.loading$.subscribe((loading: boolean) => {
      this.loading = loading;
    })
  }
  buttonsOptions(type: string, contact: Contacts) {
    switch (type) {
      case 'delete':
        const dialogRef = this.dialog.open(DeleteModalComponent, {
          data: contact,
        })
        dialogRef.afterClosed().subscribe(wasDeleted => {
          if (wasDeleted == true) {
            this.getContacts();
          }
        });
        break;

      default:
        break;
    }
  }

  getContacts() {
    this.loadingService.setLoading(true);
    this.contactsService.getContacts()
      .pipe(takeUntil(this.unsubscribe$)).subscribe({
        next: (contacts) => {
          if (contacts.status === 200) {
            this.contactList = []
            contacts.data.forEach(element => {
              element.fullName = element.name + ' ' + element.lastName
              this.contactList.push(element)
            });
            this.searchService.saveArray(this.contactList);
            this.cleanInputSearch.emit();
            this.loadingService.setLoading(false);
          } else {
            this.loadingService.setLoading(false);
          }
        },
        error: (err) => {
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
