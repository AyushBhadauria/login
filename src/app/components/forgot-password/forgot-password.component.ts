import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {
  success: any;
error:any
public loading=false;
  constructor(private authService:AuthService) { }

  ngOnInit() {
 
  }
  send(e){
    const email={
      email:e
    }
    this.loading=true
  this.authService.forgotPassword(email).subscribe(data =>{
    this.loading=false
    if(data.success){
       this.success=data.msg
      }
     else{
    this.error=data.msg
     }
  })
  }
}
