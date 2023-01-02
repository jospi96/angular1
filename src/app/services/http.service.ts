import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError,Observable,throwError } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Comments, Post, User } from '../model'

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  constructor(private http: HttpClient) { }

   handleError(error: HttpErrorResponse) {
    if (error.status === 0) {

      console.error('An error occurred:', error.error);
    } else {

      alert(error.error[0].field + " " + error.error[0].message);

    }

    return throwError(() => new Error('Something bad happened; please try again later'));

  }

  getHeader() {

    let header = new HttpHeaders({
      "Accept": "application/json", "Content-Type": "application/json",
      "Authorization": `Bearer ${environment.key}`
    })
    return header

  }

  getUserList(page: string, forPage: string, type?: string, term?: string):any {


    return this.http.get<User[]>(`${environment.userUrl}?${type}=${term}&page=${page}&per_page=${forPage}`
      , { observe: "response", headers: this.getHeader() }).pipe(
        catchError(this.handleError)
      );




  }


  addUser(user: User) {


    return this.http.post(environment.userUrl,
      user, { observe: "response", headers: this.getHeader() }).pipe(
        catchError(this.handleError)
      )


  }

  editUser(user: User, id: string) {

    return this.http.put(`${environment.userUrl}/${id}`,
      user, { observe: "response", headers: this.getHeader() }).pipe(
        catchError(this.handleError)
      )

  }

  deleteUser(id: string) {

    return this.http.delete(`${environment.userUrl}/${id}`,
      { observe: "response", headers: this.getHeader() }).pipe(
        catchError(this.handleError)
      );
  }

  userDetails(id: string) {
    return this.http.get(`${environment.userUrl}/${id}`,
      { observe: "response", headers: this.getHeader() }).pipe(
        catchError(this.handleError)
      )
  }


  getUserPost(id: string, page: string) {
    return this.http.get(`${environment.userUrl}/${id}/posts?page=${page}&per_page=4`,
      { observe: "response", headers: this.getHeader() }).pipe(
        catchError(this.handleError))
  }


  getAllPost(page: string, term?: string) {
    return this.http.get(`${environment.postUrl}?title=${term}&page=${page}&per_page=4`,
      { observe: "response", headers: this.getHeader() }).pipe(
        catchError(this.handleError)
      )

  }
  addPost(post: Post) {

    return this.http.post(environment.postUrl, post, {
      observe: "response",
      headers: this.getHeader()
    }).pipe(
      catchError(this.handleError)
    )

  }



  getComentPost(postId: string) {

    return this.http.get(`${environment.postUrl}/${postId}/${environment.comments}`,
      { observe: "response", headers: this.getHeader() }).pipe(
        catchError(this.handleError))
  }


  addComment(postId: string, comment: Comments) {
    return this.http.post(`${environment.postUrl}/${postId}/${environment.comments}`, comment
      , { observe: "response", headers: this.getHeader() }).pipe(
        catchError(this.handleError)
      )
  }

}
