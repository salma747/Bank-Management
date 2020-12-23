import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../services/token-storage.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  isLoggedIn=false;
  isAdmin=false;
  constructor(private tokenStorageService:TokenStorageService,private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((data)=>{
      this.isLoggedIn=this.tokenStorageService.isLoggedIn();
      this.isAdmin=this.tokenStorageService.isAdmin();
    })
  }

  logout() {
    this.authService.logout();
  }
}
