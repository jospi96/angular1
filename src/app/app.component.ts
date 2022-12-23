import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular1';
  constructor(private authService: AuthService) { }

  ngOnInit() {
    if (localStorage.getItem("key")) {
      this.authService.setKey("" + localStorage.getItem("key"),
        JSON.parse(localStorage.getItem("user")))
    }
  }
}
