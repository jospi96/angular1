import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Post, User } from '../model';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(private httpService: HttpService,
    private router: Router,
    private route: ActivatedRoute) { }

  user: User
  posts: Post[]

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.getDetails(params.get("id"))
    })
  }

  getDetails(id: string) {
    this.httpService.userDetails(id).subscribe((data: any) => {
      this.user = data.body
    })
  }
}
