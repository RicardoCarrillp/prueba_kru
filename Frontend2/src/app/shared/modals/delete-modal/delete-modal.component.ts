import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Contacts } from 'src/app/models/contact.model';
import { AlertService } from 'src/app/services/alert.service';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DeleteModalComponent>,
    private contactsService: ContactsService,
    @Inject(MAT_DIALOG_DATA) public data: Contacts, private alertService: AlertService) { }

  ngOnInit() {
  }


  deleteContact() {
    this.contactsService.deleteContacts(this.data.id!).subscribe({
      next: () => {
        this.dialogRef.close();
        this.emitFunction();
        this.alertService.showAlert("Contacto eliminado con exito", 'success')
      },
      error: (err: any) => {
        this.alertService.showAlert("Hubo un error en el servidor", 'error')
      }
    })
  }
  emitFunction() {
    this.dialogRef.close(true);
  }

}
