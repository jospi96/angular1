import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  key: any | undefined
  
  constructor(private authSerive: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.key = localStorage.getItem("key")
  }

  logout() {
    this.authSerive.logout()
    this.router.navigate(['login'])
  }
}
