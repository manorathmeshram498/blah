import { Injectable } from '@angular/core';
import {BehaviorSubject, from as fromPromise, Observable, of} from 'rxjs';
import {LocalUser} from './models/localUser';
import {Router} from '@angular/router';
import {Funcs} from '../utility/functions';
import {HttpClient} from '@angular/common/http';
import {catchError, first, switchMap} from 'rxjs/operators';
import {map} from 'rxjs/internal/operators';

import {Content} from './models/content';



@Injectable({
  providedIn: 'root'
})




export class LoggedUserService {
  currentUser: BehaviorSubject<LocalUser>;
  $logged: Observable<LocalUser>;
  isAuthenticated$: Observable<boolean>;
  allLevels: Array<{ name: string, description: string }>;
  // public userRef = (id: string): AngularFirestoreDocument<LocalUser> => this.afs.doc(`users/${id}`);
  init = (): void => {
    this.currentUser = new BehaviorSubject<LocalUser>(null);
    this.isAuthenticated$ = this.afAuth.authState.pipe(
      map((res) => !!res)
    );
    this.$logged = this.afAuth.authState.pipe(
      switchMap((user) => user ? this.userRef(user.uid).valueChanges() : of(null)),
      catchError(err => {
        this.functions.handleError(err.message);
        return of(null);
      })
    );
    this.$logged.subscribe((users) => this.currentUser.next(users));

  }
  signIn = (username: string, pass: string): Promise<any> => this.afAuth.auth.signInWithEmailAndPassword(username + '@ant.in', pass);
  signUp = (username: string, pass: string): Promise<void> => this.afAuth.auth.createUserWithEmailAndPassword(username + '@ant.in', pass)
    .then((response) => {
      const user = response.user;
      this.userRef(user.uid).set({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        levelsRequested: [],
        levelsCurrent: ['member']
      } as LocalUser, {merge: true});
    })
  requestLevel = (level: string): Observable<number> => this.currentUser.pipe(
    first(),
    switchMap((user: LocalUser) => fromPromise(this.userRef(user.uid).update({
      levelsRequested: [...user.levelsRequested, level]
    } as LocalUser)).pipe(
      map(() => 200),
      catchError((err) => this.functions.handleError(err.message))
    )))
  logout = (): Promise<void | boolean> => this.afAuth.auth.signOut();
  checkLevel = (str: string) => this.currentUser.pipe(
    map((user: LocalUser) => user ?
      user.levelsCurrent.includes(str) || user.levelsCurrent.includes('admin') : false)
  )
  checkAdmin = (): Observable<boolean> => this.checkLevel('admin');

  constructor(private http: HttpClient,
              private router: Router,
              // private afAuth: AngularFireAuth,
              // private afs: AngularFirestore,
              private functions: Funcs) {
    this.init();
    // setTimeout(() => this.afs.collection('ping').valueChanges().subscribe(() => console.log('hi fellow hackers')), 3000);
  }
}

