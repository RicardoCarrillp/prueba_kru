import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Contacts } from '../models/contact.model';
@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  apiUrl ="http://localhost:4000/api/contacts"
  constructor(private http: HttpClient) { }

  getContacts(): Observable<Contacts[]> {
    return this.http.get<Contacts[]>(this.apiUrl);
}
}
