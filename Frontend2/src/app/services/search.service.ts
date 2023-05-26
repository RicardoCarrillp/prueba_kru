import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { Contacts } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  contacts: Contacts[] = [];
  constructor() { }

  private searchQuerySubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  searchQuery$: Observable<string> = this.searchQuerySubject.asObservable();

  searchResults$: Observable<any[]> = this.searchQuery$.pipe(
    map((query: string) => {
      return this.contacts.filter((item: any) =>
        item.fullName.toLowerCase().includes(query.toLowerCase())
      );
    })
  );
  saveArray(contacts: any[]) {
    this.contacts = contacts;
  }
  updateSearchQuery(query: string) {
    this.searchQuerySubject.next(query);
  }
}
