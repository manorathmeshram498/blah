import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'flex-layouts';
  pics = [
    {img: '/assets/w1.jpeg', name :'Roadtrips'},
    {img: '/assets/eso.jpg', name:'Junoon'},
    {img:'/assets/w1.jpeg', name: 'Dj war'},
    {img:'/assets/jumbotron_1200.jpg', name:'carryminati'}
  ];
}
