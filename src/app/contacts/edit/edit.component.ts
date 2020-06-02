import { Component, OnInit } from '@angular/core';
import { Contact } from './../shared/contact';
import { ContactService } from '../service/contact.service';
import { ContactDataService } from '../shared/contact-data.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})

export class EditComponent implements OnInit {
  contact: Contact;
  key = '';

  constructor(
    private contactService: ContactService,
    private contactDataService: ContactDataService
  ) { }

  ngOnInit() {
    this.contact = new Contact();
    this.contactDataService.currentContact.subscribe(data =>{
      if (data.contact && data.key) {
        this.contact = new Contact();
        this.contact.name = data.contact.name;
        this.contact.email = data.contact.email;
        this.contact.phone = data.contact.phone;
        this.key = data.key;
      }
    });
  }

  onSubmit() {
    if (this.key) {
      this.contactService.update(this.contact, this.key);
    } else {
      this.contactService.insert(this.contact);
    }
    this.contact = new Contact();
  }
}
