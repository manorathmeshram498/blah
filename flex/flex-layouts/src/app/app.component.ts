import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'flex-layouts';
  t = 0;
  h = window.innerHeight;
  pics = [
    { img: '/assets/w1.jpeg', name: 'Roadtrips' },
    { img: '/assets/eso.jpg', name: 'Junoon' },
    { img: '/assets/aftermovie.jpeg', name: 'Dj war' },
    { img: '/assets/jumbotron_1200.jpg', name: 'carryminati' },
  ];

  @HostListener('window:scroll') scroll() {
    this.t = (window.scrollY / this.h) * 100;
  }
}
