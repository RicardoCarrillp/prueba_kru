import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Contacts } from '../models/contact.model';
import { Result } from '../models/result.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  constructor(private http: HttpClient) { }

  getContacts(): Observable<Result> {
    return this.http.get<Result>(`${environment.urlApi}contacts`);
  }
  createContacts(contact: Contacts): Observable<Result> {
    return this.http.post<Result>(`${environment.urlApi}contacts`, contact);

  }
}
