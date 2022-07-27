import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { StaticContent } from '../../common/model/static-content.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  staticContent: StaticContent = new StaticContent();
  darkTheme: boolean = true;
  @Output() dark = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  toggleSwitch(){
    this.darkTheme = !this.darkTheme;
    this.dark.emit(this.darkTheme)
  }
}

