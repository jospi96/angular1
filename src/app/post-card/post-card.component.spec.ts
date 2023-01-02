import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm, RequiredValidator } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { Comments } from '../model';
import { HttpService } from '../services/http.service';

import { PostCardComponent } from './post-card.component';

describe('PostCardComponent', () => {
  let component: PostCardComponent;
  let fixture: ComponentFixture<PostCardComponent>;
  let httpClientSpy: { post: jasmine.Spy , get:jasmine.Spy};
  let service: HttpService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostCardComponent ],
      imports:[HttpClientTestingModule,
        FormsModule ,
        RouterModule.forRoot([]),],
       schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    

    fixture = TestBed.createComponent(PostCardComponent);
    httpClientSpy=jasmine.createSpyObj('HttpClient', ['post','get']);
    service = new HttpService(httpClientSpy as any)
    component = new PostCardComponent(service);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('shoul when add comment resp 200', fakeAsync(()=>{
    
    const mockResp= new HttpResponse({ status:200})
    const comment: Comments ={
      body:"comment body",
      email:"test@test.it",
      name:"pico pallo",
      post_id:2323,
    }
    const comments:Comments[]=[]
    comments.push(comment)
   const dataresp= new HttpResponse({body:comments})
    
    let form = <NgForm>{
      reset: () => null,
      value:{textArea:"ashahshahs"}}
    component.post={
      body:"Body post",
      title:"Title",
      id:2343,
      user_id:233
      
    }
    spyOn(service,"addComment").and.returnValue(of(mockResp));
    spyOn(service,"getComentPost").and.returnValue(of(dataresp))
    console.log(dataresp)
    component.addComment(form)
    flush() 
    expect(200).toEqual(mockResp.status)

  }))

});
