import {ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap } from '@angular/router';
import {Post} from '../model';
import {HttpService } from '../services/http.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})

export class ViewPostComponent implements OnInit {

  posts: Post[] = []
  page: number = 1
  id: string
  terms: string = ""

  constructor(private httpService: HttpService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,

  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      console.log(params.get("id"))
      this.id = params.get("id")
      this.getPost(params.get("id"), "")

    })
  }

  getPost(id?: string, term?: string) {
    if (id != null) {
      this.httpService.getUserPost(id, "" + this.page)
      .subscribe((data: any) => {
        this.posts.push(...data.body)
        this.cdr.detectChanges();
      })
    } else {

      this.httpService.getAllPost("" + this.page, term)
      .subscribe((data: any) => {
        if (this.terms === term) {
          this.posts.push(...data.body)
        } else {
          this.posts = data.body
          this.terms = term
        }
        console.log(data)
        this.cdr.detectChanges();
      })
    }
  }

  viewMore() {
    this.page++
    this.getPost(this.id, this.terms)
  }
}