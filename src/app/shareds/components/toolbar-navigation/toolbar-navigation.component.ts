import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-toolbar-navigation',
  templateUrl: './toolbar-navigation.component.html',
  styleUrls: ['./toolbar-navigation.component.scss']
})
export class ToolbarNavigationComponent{
  sidebarVisible: boolean = false;
  constructor(
    private cookieService : CookieService,
    private router: Router) {

  }

  handleLougout(): void {
    this.cookieService.delete('USER_INFO');
    void this.router.navigate(['/signin']);
  }

}
