import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { User } from '../model';
import { HttpService } from '../services/http.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  user: User

  constructor(private autService: AuthService,
    private router: Router,
    private httpService: HttpService) { }

  login(form: NgForm, gender: string) {
    let user = {
      "name": form.value.name,
      "email": form.value.email,
      "gender": gender,
      "status": "active"
    }
    this.autService.setKey(form.value.key, user)
    this.createUser(user, form.value.key)
  }

  createUser(user: User, key: string) {
    this.httpService.addUser(user).subscribe((data: any) => {
      if (data.status === 201) {
        this.user = data.body
        this.autService.setKey(key, this.user)
        localStorage.setItem("user", JSON.stringify(this.user))
        localStorage.setItem("key", key);
        this.router.navigate(["home"]);
      }
    })
  }
}

