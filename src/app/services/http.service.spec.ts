import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { User, Comments, Post } from '../model'
import { HttpService } from './http.service';

describe('HttpService', () => {
  let service: HttpService;
  let httpClienteSpy: {
    [x: string]: any; post: jasmine.Spy;
    get: jasmine.Spy;
    put: jasmine.Spy;
    delete: jasmine.Spy
  }

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [HttpClientTestingModule],
      providers: [HttpService]

    });
    httpClienteSpy = jasmine.createSpyObj('HttpClient', ['post', 'get', 'put', 'delete'])
    service = new HttpService(httpClienteSpy as any)

  });

  it('should be created', () => {
    expect(service).toBeTruthy();


  });

  it('#getUserList should return []', (done: DoneFn) => {
    const resp = new HttpResponse({ status: 200 })

    httpClienteSpy.get.and.returnValue(of(resp))
    service.getUserList("1", "1").subscribe(data => {
      expect(data.status).toEqual(200)
      done();

    })
    expect(service.getUserList("1", "1")).toBeDefined
    expect(true).toBeTruthy();

  });

  it('#addUser should return []', (done: DoneFn) => {

    const user: User = {
      "name": "Nome",
      "email": "sjjsjs@fjfj.it",
      "status": "active",
      "gender": "male"

    }
    const resp = new HttpResponse({ status: 200 })

    httpClienteSpy.post.and.returnValue(of(resp))
    service.addUser(user).subscribe(data => {
      expect(data.status).toEqual(200)
      done();
    })
    expect(service.addUser(user)).toBeDefined
    expect(true).toBeTruthy();

  });

  it('#editUser should return []', (done: DoneFn) => {

    const user: User = {
      "name": "Nome",
      "email": "sjjsjs@fjfj.it",
      "status": "active",
      "gender": "male"

    }
    const resp = new HttpResponse({ status: 201 })

    httpClienteSpy.put.and.returnValue(of(resp))
    service.editUser(user, "1").subscribe(data => {
      expect(data.status).toEqual(201)
      done()
    })
    expect(service.editUser(user, "123")).toBeDefined
    expect(true).toBeTruthy();

  });


  it('#deleteUser should return []', (done: DoneFn) => {
    const resp = new HttpResponse({ status: 200 })

    httpClienteSpy.delete.and.returnValue(of(resp))
    service.deleteUser("34").subscribe(data => {
      expect(data.status).toEqual(200)
      done()
    })
    expect(service.deleteUser("1")).toBeDefined
    expect(true).toBeTruthy();

  });

  it('#getUserPost should return []', (done: DoneFn) => {
    const resp = new HttpResponse({ status: 200 })

    httpClienteSpy.get.and.returnValue(of(resp))
    service.getUserPost("23232", "1").subscribe(data => {
      expect(data.status).toEqual(200)
      done()
    })
    expect(service.getUserPost("1", "1")).toBeDefined
    expect(true).toBeTruthy();

  });
  it('#getComentPost should return []', (done: DoneFn) => {
    const resp = new HttpResponse({ status: 200 })
    httpClienteSpy.get.and.returnValue(of(resp))
    service.getComentPost("1").subscribe(data => {
      expect(data.status).toEqual(200)
      done()
    })

    expect(service.getComentPost("1")).toBeDefined
    expect(true).toBeTruthy();

  });

  it('#addComment should return []', (done: DoneFn) => {
    const mockComment: Comments = {
      body: "sadsadasdas",
      email: "test@test.it",
      name: "sdssd",
      post_id: 3445,
    }
    const resp = new HttpResponse({ status: 200 })

    httpClienteSpy.post.and.returnValue(of(resp))
    service.addComment("1", mockComment).subscribe(data => {
      expect(data.status).toEqual(200)
      done()
    })
    expect(service.addComment("1", mockComment)).toBeDefined
    expect(true).toBeTruthy();

  });
  it('#addPost should return []', (done: DoneFn) => {
    const mockPost: Post = {

      title: "testing title",
      body: "sdfdsfsdfsdfsdfsdfsdf",
      user_id: 3343
    }
    const resp = new HttpResponse({
      status: 200
    })
    httpClienteSpy.post.and.returnValue(of(resp))
    service.addPost(mockPost).subscribe(data => {
      expect(data.status).toEqual(200)
      done()
    })

    expect(true).toBeTruthy();

  });

  it('#handleError should status 0 ', () => {

    service.handleError(new HttpErrorResponse({ status: 0 }))
    expect()
  });
  it('#handleError should status 404', () => {

    service.handleError(
      new HttpErrorResponse({ status: 401, error:"error" }))
     
      
      
    expect()
  });
});



