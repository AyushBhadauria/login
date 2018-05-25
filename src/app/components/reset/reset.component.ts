import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import 'rxjs/add/operator/switchMap';
import { Router } from '@angular/router';
import{FormGroup,FormBuilder,Validators, AbstractControl, ValidationErrors} from '@angular/forms'
import { FormValidator } from '../sign-up/validators/form.validators';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html'
})
export class ResetComponent implements OnInit {
  error: any;
  success: any;
  token:string
  public loading=false
  form
  constructor(private route:ActivatedRoute,
  private authService:AuthService,
  private router:Router,
  fb:FormBuilder) { 
    this.form=fb.group({
      newPass:['',[
      Validators.required,
      FormValidator.passwordValidator],
    ],
    confirmPass:['',[
      Validators.required],]
    },
    {validator: this.passwordConfirming}) 
  }
  
get newPass(){
  return this.form.get('newPass')
}

get confirmPass(){
  return this.form.get('confirmPass')
}
passwordConfirming(c: AbstractControl): { invalid: boolean } {
  if (c.get('newPass').value !== c.get('confirmPass').value) {
      return {invalid: true};
  }


  }

  ngOnInit() {

   this.route.paramMap
   .subscribe(params =>{
     this.token =params.get('token');
    
   })
  
  }
  onReset(){
    let form:any=this.form.value;
    this.loading=true
    this.authService.resetPassword(this.token,form).subscribe(res=>{
      this.loading=false
      if(res.success){
        this.success=res.msg;
        this.loading=true
        setTimeout(() => {  
          this.loading=false
        this.router.navigate(['/login'])
        }, 3000);
      }
      else{
       this.error=res.msg
      }
    })
  }
 
  }
  

