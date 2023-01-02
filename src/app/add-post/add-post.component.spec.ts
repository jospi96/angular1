import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Post, User } from '../model';
import { HttpService } from '../services/http.service';
import { ViewPostComponent } from '../view-post/view-post.component';
import { AddPostComponent } from './add-post.component';

describe('AddPostComponent', () => {
  let component: AddPostComponent;
  let component2: AddPostComponent;
  let fixture: ComponentFixture<AddPostComponent>;
  let service: HttpService
  let router:Router
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPostComponent],
      imports: [HttpClientTestingModule,
        FormsModule,
        RouterModule.forRoot([
          {path:"post",component:ViewPostComponent}
        ]),],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();

    
    fixture = TestBed.createComponent(AddPostComponent);
    let httpClienteSpy: { post: jasmine.Spy }
    router= TestBed.inject(Router)
    service = new HttpService(httpClienteSpy as any)
    component = new AddPostComponent(service, router);
    component2=fixture.componentInstance

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

  });

  it('Should create a form with 2 controls', () => {
    const compiled = fixture.nativeElement
    const form: NgForm = compiled.querySelector("form")
    form[0].title = "Title for test add post"
    form[0].postBody = "Post body for test add post ............"
    const user:User={
      name:"name",
      email:"email@ema.it",
      id:2354,
      gender:"male",
      status:"active"
    }
    localStorage.setItem("user",JSON.stringify(user))
    component2.formControl(form[0])
    expect(form[0].title).toBeTruthy
    expect(form[0].postBody).toBeTruthy



  });

  it('Should create post and recive response 201 status', fakeAsync(() => {
    

    const post: Post = {
      title: "Title for test add post",
      body: "body for test add post",
      user_id: 22543,

    }
    const response = new HttpResponse({
      body: post, status: 201
    })

    spyOn(service,"addPost").and.returnValue(of(response))
    component.addPost(post)
    flush() 
    expect(201).toEqual(response.status)
}));


it('Should create post and recive response fail stuas', fakeAsync(() => {
  const post: Post = {
    title: "Title for test add post",
    body: "body for test add post",
    user_id: 22543,

  }
  const response = new HttpResponse({
    body: post, status: 404
  })

  spyOn(service,"addPost").and.returnValue(of(response))
  component.addPost(post)
  expect(404).toEqual(response.status)
}));



it('Should ', () => {
  component.navigate()

});


});



