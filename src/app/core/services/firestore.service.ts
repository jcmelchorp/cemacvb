import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, from, map, Observable, of, tap } from 'rxjs';
import { doc, Firestore, getDoc, query, where,Query, collection, getDocs, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export abstract class FireStoreService<T extends { id?: string }> {
  protected readonly firestore = inject(Firestore);
  protected readonly collectionName: string;
  constructor(collection: string) {
    
    this.collectionName = collection;
  }

 

  collection(queryFn?: Query) {
    return collection(this.firestore,this.collectionName);
  }

  getSnapshotChanges(queryFn?: Query) {
    const colectRef = this.collection(queryFn)
    const colectSnap = getDocs(colectRef);
    return from(colectSnap)
  }

   async getById(id: string) {
    
    // const docQuery= query(collection(this.firestore.firestore,this.collectionName,id), where("id","==",id))
    const docRef = doc(this.firestore,this.collectionName,id);
    const docSnap = await getDoc(docRef);
    // if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return of(docSnap.data() as T)
    // }
    //  else {
    //   // docSnap.data() will be undefined in this case
    //   console.log("No such document!");
    //   return docSnap.data() as Wordlist

    // }
   
  }

  add(data: T) { 
    const colectRef = this.collection()
    return from(addDoc(colectRef,data));
  }

  update(data: T) {
    const colectRef = this.collection()
    const docRef = doc(colectRef,data.id);
    return from(updateDoc(docRef,data));
  }

  delete(data: T) {
    const colectRef = this.collection()
    const docRef = doc(colectRef,data.id);
    return from(deleteDoc(docRef));
  }
}
