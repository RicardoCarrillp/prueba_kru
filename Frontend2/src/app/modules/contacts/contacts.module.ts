import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts.component';
import { ContactsRoutingModule } from './contacts-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ContactListModule } from './contact-list/contact-list.module';
import { AddButtomModule } from 'src/app/shared/add-button/add-button.module';
@NgModule({
  imports: [
    CommonModule,
    ContactsRoutingModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    ContactListModule,
    AddButtomModule
  ],
  declarations: [ContactsComponent]
})
export class ContactsModule { }
