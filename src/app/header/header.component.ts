import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public header;
  constructor(private config: ConfigService) { }

  ngOnInit(): void {
    this.header = this.getHeader();
  }
  getHeader = () => {
    return this.config.getConfig().header;
  }

}
