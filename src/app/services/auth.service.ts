import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';

import { EndPoint } from '../shared/global';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  constructor(private http: Http) { }
registerUser(user){
return this.http.post(EndPoint.register,user)
.delay(2000)
.map(res =>res.json())

}
checkEmailNotTaken(email: string) {

  return this.http
  .get(EndPoint.users)
  .map(res => res.json())
  .map(users => users.filter(user => user.email.toLowerCase() === email.toLowerCase()))
  .map(users => !users.length)
  
  }
authenticateUser(user){
let headers =new Headers();
headers.append('Content-Type','application/json');
return this.http.post(EndPoint.authenticate,user,{headers: headers})
.delay(2000)
.map(res =>res.json());
}

storeUserData(token, user){
localStorage.setItem('user_token',token);
localStorage.setItem('user',JSON.stringify(user.id));
this.authToken=token;
this.user=user;
}


getProfile(){

this.loadToken();
let headers = new Headers({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + this.authToken });
return this.http.get(EndPoint.profile,{headers: headers})
.map(res =>res.json())

}

loadToken(){
const token =localStorage.getItem('user_token' );
this.authToken=token;
}
loggedIn(){
return tokenNotExpired('user_token');
}

logout(){
this.authToken=null;
this.user=null;
localStorage.removeItem('user_token');
}
forgotPassword(email){
  let headers =new Headers();
  headers.append('Content-Type','application/json');
  return this.http.post(EndPoint.forgot,email,{headers: headers})
  .map(res =>res.json())
  
  }
  resetPassword(token,password){
  let headers =new Headers();
  headers.append('Content-Type','application/json');
  return this.http.post(EndPoint.reset + '/' + token,password,{headers: headers})
  .map(res =>res.json())
  }
}
