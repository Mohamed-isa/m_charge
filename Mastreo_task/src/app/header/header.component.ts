import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  profileName: string = 'demo_user'; 
  showLogoutPopup: boolean = false;

  constructor(private router: Router) {}
ngOnInit(): void {
  
}
  confirmLogout() {
    this.showLogoutPopup = true;
  }

  cancelLogout() {
    this.showLogoutPopup = false;
  }

  logout() {
    this.showLogoutPopup = false;
    this.router.navigate(['/login']);
  }
}
