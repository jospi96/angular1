import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {Post} from '../model';
import {HttpService} from '../services/http.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
  post: Post
  response: string=""
  constructor(
    private httpService: HttpService,
    private router: Router
    ) {}

  formControl(form: NgForm) {
    let user = JSON.parse(localStorage.getItem("user"))
    let post = {
      "title": form.value.title,
      "body": form.value.postBody,
      "user_id": user.id,

    }
    this.addPost(post)

  }
  addPost(post: Post) {
    this.httpService.addPost(post).subscribe((data: any) => {
      if (data.status == 201) {
        this.response = "Post created"
        this.navigate()
      } else {
        this.response = "Have a problem"
      }
    })
  }

  navigate() {
    setTimeout(() => {
      this.router.navigate(["post"])
    }, 2000);
  }
}
