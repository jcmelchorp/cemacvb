import { inject, Injectable } from "@angular/core";
import { Auth, authState, createUserWithEmailAndPassword, GoogleAuthProvider, idToken, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, user, UserCredential } from "@angular/fire/auth";
import { doc, Firestore, setDoc } from "@angular/fire/firestore";
import { User } from "../models/user.model";

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

  

  byGoogle(): Promise<User> {
    // you can simply change the Google for another provider here
    return signInWithPopup(this._auth, new GoogleAuthProvider()).then(
      (auth) => this._setUserData(auth)
    );
  }

  signup(email: string, password: string): Promise<User> {
    return createUserWithEmailAndPassword(
      this._auth,
      email.trim(),
      password.trim()
    ).then((auth) => this._setUserData(auth));
  }

  login(credential:Credential): Promise<User> {
    return signInWithEmailAndPassword(
      this._auth,
      credential.email.trim(),
      credential.password.trim()
    ).then((auth) => this._setUserData(auth));
  }

  logOut(): Promise<void> {
    return this._auth.signOut();
  }

  private _setUserData(auth: UserCredential): Promise<User> {
    const user: User = {
      id: auth.user.uid,
      name: (auth.user.displayName || auth.user.email)!,
      email: auth.user.email!,
      emailVerified: auth.user.emailVerified,
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