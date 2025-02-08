import { inject, Injectable } from "@angular/core";
import { Auth, authState, createUserWithEmailAndPassword, GoogleAuthProvider, idToken, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, user, User, UserCredential } from "@angular/fire/auth";
import { doc, Firestore, getDoc, setDoc, updateDoc } from "@angular/fire/firestore";
import { User as AuthUser } from '../../auth/models/user.model';
import { from, Observable } from "rxjs";
import { firebaseSerialize } from "../../models/firebase.model";

export interface Credential {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _firestore = inject(Firestore);
  private _auth = inject(Auth);
  authState$ = authState(this._auth);  // 👈👈👈
  user$ = user(this._auth);            // 👈👈👈
  idToken$ = idToken(this._auth);      // 👈👈👈

  

  byGoogle(): Promise<AuthUser> {
    // you can simply change the Google for another provider here
    return signInWithPopup(this._auth, new GoogleAuthProvider()).then(
      (auth) => this._setUserData(auth)
    );
  }

  signup(email: string, password: string): Promise<AuthUser> {
    return createUserWithEmailAndPassword(
      this._auth,
      email.trim(),
      password.trim()
    ).then((auth) => this._setUserData(auth));
  }

  login(credential:Credential): Promise<AuthUser> {
    return signInWithEmailAndPassword(
      this._auth,
      credential.email.trim(),
      credential.password.trim()
    ).then((auth) => this._setUserData(auth));
  }

  logOut(id?:string): Promise<void> {
    return this._auth.signOut();
  }

  checkAdminRole(id: string): Observable<boolean> {
    /*  if (environment.useAuthEmulator) {
       const doc = ref(this.database, `${this.collection}/${id}`);
       return objectVal(doc).pipe(pluck('isAdmin'));
     } else { */
    const afsRef = doc(this._firestore, `users/${id}`);
    return from(getDoc(afsRef).then(user => user.get('isAdmin')));
    /* } */
  }
  
  saveUser(user: AuthUser) {
    const key = user.id;
    /*  if (environment.useAuthEmulator) {
       const rtdbRef = ref(this.database, `${this.collection}/${key}`);
       return from(update(rtdbRef, user))
     } else { */
    const afsRef = doc(this._firestore,`users/${user.id}`);
    return from(updateDoc(afsRef, firebaseSerialize(user)))
    /* } */
  } 

  updateOnlineStatus(id: string, status: boolean): Observable<void> {
    /* if (status) {
      return from(
        this.afDatabase.database
          .ref()
          .child(`${this.collection}/${id}`)
          .onDisconnect()
          .update({ isOnline: status })
      );
    }
    return from(
      this.afDatabase
        .object(`${this.collection}/${id}`)
        .update({ isOnline: status })
    ); */
    /*  if (environment.useAuthEmulator) {
       const doc = ref(this.database, `${this.collection}/${id}`);
       return from(update(doc, { isOnline: status }));
     } else { */
    const afsRef = doc(this._firestore, `users/${id}`);
    return from(updateDoc(afsRef, { isOnline: status }));
    /*  } */
  }
  
  private _setUserData(auth: UserCredential): Promise<AuthUser> {
    console.log(auth.user)
    const user: AuthUser = {
      uid: auth.user.uid!,
      id:auth.user.providerData[0].uid,
      photoUrl:auth.user.providerData[0].photoURL!,
      name: {fullName:auth.user.providerData[0].displayName!},
      primaryEmail: auth.user.email!,
      isVerified: auth.user.emailVerified,
      // custom ones
    };
    const userDocRef = doc(this._firestore, `users/${user.id}`);
    return setDoc(userDocRef, user).then(() => user);
  }

  isAuthenticated(): boolean {
    const user = this._auth.currentUser;
    console.log(user?.uid);
    console.log(user?.email);
    return user !== null;
  }

  //Send Password Reset Email
  async sendPasswordResetEmails(email : string){
    sendPasswordResetEmail(this._auth,email)
    .then(() => {
       window.alert('Password reset email sent, check your inbox.');
    })
    .catch((error) => {
     window.alert(error.message);
   });
 }

//  //Send Email Verification
//  sendEmailVerification(){
//    return sendEmailVerification(this._auth.currentUser as User );
//  }
}