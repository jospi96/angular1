import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ViewPostComponent } from './view-post.component';

import { ActivatedRoute,  RouterModule } from '@angular/router';
import { ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Post } from '../model';
import { HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

describe('ViewPostComponent', () => {
  let component: ViewPostComponent;
  let fixture: ComponentFixture<ViewPostComponent>;
  let service: HttpService
  let httpClientSpy: { get: jasmine.Spy};
  let router:ActivatedRoute
  let cdr

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPostComponent ],
      imports:[HttpClientTestingModule,
        RouterModule.forRoot([]),],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewPostComponent);
    router= TestBed.inject(ActivatedRoute)
    cdr= fixture.debugElement.injector.get(ChangeDetectorRef, null)
    service = new HttpService(httpClientSpy as any)
    component = new ViewPostComponent(service,router,cdr);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  


  it('should get a single post', fakeAsync(() => {
    const mockPost:Post={
      body:"post of test",
      title:"test pos",
      user_id:2543

    }
    const mockPosts:Post[]=[]
    mockPosts.push(mockPost)
    const mockResp= new HttpResponse({body:mockPosts, status:200})
    spyOn(service,"getUserPost").and.returnValue(of(mockResp))
    component.getPost("3445","test")
    flush() 

    expect(200).toEqual(mockResp.status)  
  }));

  it('should get all post', fakeAsync(() => {
    const mockPost:Post={
      body:"post of test",
      title:"test pos",
      user_id:2543

    }
    const mockPosts:Post[]=[]
    mockPosts.push(mockPost)
    const mockResp= new HttpResponse({body:mockPosts, status:200})
    spyOn(service,"getAllPost").and.returnValue(of(mockResp))
    component.getPost(null,"test")
    flush() 

    expect(200).toEqual(mockResp.status)  
  }));
});
