import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'games';

  games = [
    {task_no: 'T1', points: '30', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe, in iusto '},
    {task_no: 'T2', points: '30', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe, in iusto '},
    {task_no: 'T3', points: '30', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe, in iusto '},
  ];
}
