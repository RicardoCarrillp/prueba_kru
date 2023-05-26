import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  searchControl = new FormControl();
  inputValue!: string;
  searchResults: any[] = [];

  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }

  updateSearchQuery() {
    this.searchService.updateSearchQuery(this.inputValue);
  }

  cleanInput(value:string) {
    this.inputValue=value;
  }

}
