import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contacts } from 'src/app/models/contact.model';
import { AlertService } from 'src/app/services/alert.service';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent implements OnInit {
  contactForm: FormGroup;
  constructor(private fb: FormBuilder, private route: Router, private contactsService: ContactsService, private alertService: AlertService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      birthday: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      typeContact: ['', Validators.required],
      origin: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  sendInfo() {
    const stringDate = this.dateToString();

    const contact: Contacts = {
      name: this.contactForm.value.name,
      lastName: this.contactForm.value.lastName,
      email: this.contactForm.value.email,
      phone: this.contactForm.value.phone,
      birthday: stringDate,
      address: this.contactForm.value.address,
      typeContact: this.contactForm.value.typeContact,
      origin: this.contactForm.value.origin,
    }
    this.contactsService.createContacts(contact).subscribe({
      next: () => {
        this.alertService.showAlert("Contacto creado con exito", 'success');
        this.goBack();
      },
      error: (err) => {
        this.alertService.showAlert("No se pudo crear el contacto", 'error');
      }
    })
  }

  goBack() {
    this.route.navigate(['contacts']);
  }
  dateToString(): string {
    const stringDate: string = `${this.contactForm.value.birthday.getMonth() + 1}/${this.contactForm.value.birthday.getDate()}/${this.contactForm.value.birthday.getFullYear()}`;
    return stringDate;
  }
}
