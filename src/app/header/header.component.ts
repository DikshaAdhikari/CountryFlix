import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { StaticContent } from '../common/model/static-comtent.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  staticContent: StaticContent = new StaticContent();
  constructor() { }

  ngOnInit(): void {
  }

}
