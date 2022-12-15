import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { User } from '../model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
key=environment.key
user=environment.user
  constructor() { }

setKey(key:string, user:User){
  this.key=key;
  this.user=user
  environment.key=key
  environment.user=user
}

logout(){
  localStorage.removeItem("user")
  localStorage.removeItem("key")
  environment.key=null
  environment.user=null
}
  
}
