import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../Models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
user:User[]=[];
  constructor(private authService:AuthService) { }

  ngOnInit() {


    if(this.authService.loggedIn()==true)
    {
      this.getProfile()
  
    }
  }
  getProfile(){

    this.authService.getProfile().subscribe(profile => {
    this.user = profile.user;
   
  
   

})
  }
}