import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../Models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user:User[]=[]
  constructor(private authService:AuthService,
  private router:Router) { }

  ngOnInit() {

  }
  onLogoutClick(){
    this.authService.logout();
    this.router.navigate(['/login']);
    return false;
  }
}
