import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'countryFlix';
  darkTheme: boolean = true;

  dark(event: boolean){
    this.darkTheme = event;
  }
}
