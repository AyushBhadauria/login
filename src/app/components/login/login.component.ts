import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../Models/User';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  disabled: boolean;
  public loading=false
  error: any;
email:String;
password:String;
users:User[]=[];
checkuser:User[]=[];
constructor(private authService:AuthService,
private router:Router) { }


  ngOnInit() {
  
  }
  onLogin(){
    const user ={
      email: this.email,
      password:this.password
    }
    this.loading=true
    this.authService.authenticateUser(user).subscribe(data=>{
      console.log(data)
    this.loading=false
     if(data.success){
  
    this.authService.storeUserData(data.token, data.user);
    this.router.navigate(['/profile']);
    }

     else{
       
      this.error=data.msg
      this.router.navigate(['/login']);

     }
    });
  }
}
