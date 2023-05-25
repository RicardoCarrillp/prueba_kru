import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts.component';
import { CreateContactComponent } from './create-contact/create-contact.component';

const routes: Routes = [
  {
    path: '',
    component:ContactsComponent

  },
  {
    path: 'new',
    loadChildren: () => import('./create-contact/create-contact.module').then(m => m.CreateContactModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
