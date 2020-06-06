import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private fireStoreService: AngularFirestore) {}
  create() {
    // this.fireStoreService.collection('').add();
  }
} //end of Class
