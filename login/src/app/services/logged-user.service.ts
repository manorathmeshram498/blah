import { Injectable } from '@angular/core';
import { BehaviorSubject, from as fromPromise, Observable, of } from 'rxjs';
import { LocalUser } from './models/localUser';
import { Funcs } from '../utility/functions';
import { catchError, first, switchMap } from 'rxjs/operators';
import { map } from 'rxjs/internal/operators';
import {
  AngularFirestoreDocument,
  AngularFirestore,
} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class LoggedUserService {
  currentUser: BehaviorSubject<LocalUser>;
  $logged: Observable<LocalUser>;
  isAuthenticated$: Observable<boolean>;
  public userRef = (id: string): AngularFirestoreDocument<LocalUser> =>
    this.afs.doc(`users/${id}`)
  init = (): void => {
    this.currentUser = new BehaviorSubject<LocalUser>(null);
    this.isAuthenticated$ = this.afAuth.authState.pipe(map((res) => !!res));
    this.$logged = this.afAuth.authState.pipe(
      switchMap((user) =>
        user ? this.userRef(user.uid).valueChanges() : of(null)
      ),
      catchError((err) => {
        this.functions.handleError(err.message);
        return of(null);
      })
    );
    this.$logged.subscribe((users) => this.currentUser.next(users));
  }
  signIn = (username: string, pass: string): Promise<any> =>
    this.afAuth.signInWithEmailAndPassword(username + '@ant.in', pass)
  signUp = (username: string, pass: string): Promise<void> =>
    this.afAuth
      .createUserWithEmailAndPassword(username + '@ant.in', pass)
      .then((response) => {
        const user = response.user;
        this.userRef(user.uid).set(
          {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            levelsRequested: [],
            levelsCurrent: ['member'],
          } as LocalUser,
          { merge: true }
        );
      })
  requestLevel = (level: string): Observable<number> =>
    this.currentUser.pipe(
      first(),
      switchMap((user: LocalUser) =>
        fromPromise(
          this.userRef(user.uid).update({
            levelsRequested: [...user.levelsRequested, level],
          } as LocalUser)
        ).pipe(
          map(() => 200),
          catchError((err) => this.functions.handleError(err.message))
        )
      )
    )
  logout = (): Promise<void | boolean> => this.afAuth.signOut();
  checkLevel = (str: string) =>
    this.currentUser.pipe(
      map((user: LocalUser) =>
        user
          ? user.levelsCurrent.includes(str) ||
            user.levelsCurrent.includes('admin')
          : false
      )
    )
  checkAdmin = (): Observable<boolean> => this.checkLevel('admin');

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private functions: Funcs
  ) {
    this.init();
  }
}
