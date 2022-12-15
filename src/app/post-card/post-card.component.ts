import { Component, Input } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Comments, Post } from '../model';
import { HttpService } from '../services/http.service';


@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})

export class PostCardComponent {

  constructor(private httpService: HttpService) { }
  @Input() post: Post
  panelOpenState = false;
  comments: Comments[] = []
  formComment: Form



  getPostComment(postId: string) {
    this.httpService.getComentPost(postId).subscribe((data: any) => {
      this.comments.push(...data.body)
      

    })
  }
  destroyComment() {
    this.comments = []
  }

  addComment(form: NgForm) {
    this.httpService.addComment("" + this.post.id,
      this.setComment(form)).subscribe((data: any) => {
        this.destroyComment()
        this.getPostComment("" + this.post.id)
        form.reset()
      })
  }

  setComment(form: NgForm) {
    let user = JSON.parse(localStorage.getItem("user"))

    let commentObject = {
      body: form.value.textArea,
      email: user.email,
      post_id: this.post.id,
      name: user.name,
    }
    let comment: Comments
    comment = commentObject
    

    return comment

  }
}
