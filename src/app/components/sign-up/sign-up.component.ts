import { Component, OnInit, TemplateRef, ElementRef } from '@angular/core';

import{FormGroup,FormControl,FormBuilder,Validators, AbstractControl, ValidationErrors} from '@angular/forms'
import { FormValidator } from './validators/form.validators';
import { AuthService } from '../../services/auth.service';
import { User } from '../../Models/User';
import { Router } from '@angular/router';


@Component({
 
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent implements OnInit {
  loading: boolean;
  error: boolean;
  signin: boolean;
  form;
  constructor(fb:FormBuilder,
  private authService:AuthService,
  private router:Router,
  private el: ElementRef) {
    this.form=fb.group({
    name:['',[
    Validators.required,
     Validators.maxLength(30),
     ],
  ],

  email:['',[
    Validators.required,
    Validators.email],
    FormValidator.validEmail(this.authService)
  ],

  password:['',[
  Validators.required,
 FormValidator.passwordValidator],
  
],
  confirmPassword:['',[
  Validators.required]
  ],
  contact:['',[
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10),
    FormValidator.validContact]
  ],
  },
  {validator: this.passwordConfirming})

} 
passwordConfirming(c: AbstractControl): { invalid: boolean } {
  if (c.get('password').value !== c.get('confirmPassword').value) {
      return {invalid: true};
  }
}
  ngOnInit() {}

  onSubmit(){
    this.loading=true
    let user:User=this.form.value;
    this.authService.registerUser(user).subscribe(data =>{
      this.loading=false
      if(data.success){
      this.form.reset()
      this.signin=true;
      setTimeout(() => {  
        
      this.router.navigate(['/login'])
      }, 3000);
      }
     else{
      this.error=true;
     
      setTimeout(() => {  
      
        this.router.navigate(['/signup'])

        }, 3000);
     }
   });
  }


  get name(){
    return this.form.get('name')
  }
  get email(){
    return this.form.get('email')
  }

  get contact(){
    return this.form.get('contact')
  }

  get password(){
    return this.form.get('password')
  }
  get confirmPassword(){
    return this.form.get('confirmPassword')
  }
  
}
