import { Injectable } from '@angular/core';
import { Contact } from '../shared/contact';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private fireStore: AngularFireDatabase) { }

  insert(contact: Contact) {
    this.fireStore.list('contact').push(contact)
      .then((result: any) => {
        console.log(result.key);
      });
  }

  update(contact: Contact, key: string) {
    this.fireStore.list('contact').update(key, contact)
    .catch((error: any) => {
      console.log(error);
    });
  }

  getAll() {
    return this.fireStore.list('contact')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({
            key: c.payload.key, ...c.payload.exportVal()
          }));
        })
      );
  }

  delete(key: string) {
    this.fireStore.object('contact/' + key).remove();
  }
}
