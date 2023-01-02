import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { User } from '../model';
import { HttpService } from '../services/http.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let component2: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: HttpService
  let authService:AuthService
  let router:Router
  let httpClientSpy: { post: jasmine.Spy , put:jasmine.Spy};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports:[HttpClientTestingModule,
        RouterModule.forRoot([
          {path:"home",component:DashboardComponent}
        ]),
        FormsModule ],
       schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    httpClientSpy=jasmine.createSpyObj('HttpClient', ['post','put'])
    authService= new AuthService()
    router= TestBed.inject(Router)
    service = new HttpService(httpClientSpy as any)
    component = new LoginComponent(authService,router,service);
    component2=fixture.componentInstance
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shoul when add user resp 200', fakeAsync(()=>{
    const mockUser:User={
    name:"Pinco Pallino",
    email:"pincopallo@gmail.com",
    gender:"male",
    status:"active"
    }
    const mockResp= new HttpResponse({body:mockUser, status:201})
    spyOn(service,"addUser").and.returnValue(of(mockResp))
    component.createUser(mockUser,"asddfdfsdf")
    flush() 
    expect(201).toEqual(mockResp.status)

  }))

  it('Should form submit control case user edit ""', () => {
    const compiled = fixture.nativeElement
    const form: NgForm = compiled.querySelector("form")
    form[0].name = "Pinco Pallo"
    form[0].email = "test@test.it"
    component2.login(form[0],"male")
    expect(form[0].name).toBeTruthy
    expect(form[0].email).toBeTruthy



  });


});
