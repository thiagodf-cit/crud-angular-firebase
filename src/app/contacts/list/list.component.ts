import { Contact } from './../shared/contact';
import { Component, OnInit } from '@angular/core';
import { ContactService } from './../service/contact.service';
import { Observable } from 'rxjs';
import { ContactDataService } from './../shared/contact-data.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  contacts: Observable<any>;

  constructor(
    private contactService: ContactService,
    private contactDataService: ContactDataService
  ) { }

  ngOnInit() {
    this.contacts = this.contactService.getAll();
  }

  delete(key: string) {
    this.contactService.delete(key);
  }

  edit(contact: Contact, key: string) {
    this.contactDataService.changeContact(contact, key);
  }
}
