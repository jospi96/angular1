import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { User } from '../model';
import { HttpService } from '../services/http.service';

import { AddUserComponent } from './add-user.component';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;
  let component2: AddUserComponent
  let service: HttpService
  let router:Router
  let httpClientSpy: { post: jasmine.Spy , put:jasmine.Spy};

  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserComponent ],
      imports:[HttpClientTestingModule,
        FormsModule ,
        RouterModule.forRoot([
          {path:"home",component:DashboardComponent}
        ]),],
       schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserComponent);
    let response=new HttpResponse({})
    httpClientSpy=jasmine.createSpyObj('HttpClient', ['post','put'])
 
    router= TestBed.inject(Router)
    service = new HttpService(httpClientSpy as any)
    component = new AddUserComponent(service, router,null);
    component2=fixture.componentInstance
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('Should form submit control case user edit ""', () => {
    const compiled = fixture.nativeElement
    const form: NgForm = compiled.querySelector("form")
    form[0].name = "Pinco Pallo"
    form[0].email = "test@test.it"
    component2.userEdit.name=""
    component2.formContron(form[0],"active","male")

    expect(form[0].name).toBeTruthy
    expect(form[0].email).toBeTruthy



  });
  it('Should form submit control case user edit seted', () => {
    const compiled = fixture.nativeElement
    const form: NgForm = compiled.querySelector("form")
    form[0].name = "Pinco Pallo"
    form[0].email = "test@test.it"
    component2.userEdit.name="rddfds"
    
    
   component2.formContron(form[0],"active","male")

    expect(form[0].name).toBeTruthy
    expect(form[0].email).toBeTruthy



  });


  it('Should when add user resp 200', fakeAsync(()=>{
    const mockUser:User={
    name:"Pinco Pallino",
    email:"pincopallo@gmail.com",
    gender:"male",
    status:"active"
    }
    const mockResp= new HttpResponse({body:mockUser, status:200})
    spyOn(service,"addUser").and.returnValue(of(mockResp))
    component.addUser(mockUser)
    flush() 
    expect(200).toEqual(mockResp.status)

  }))
  it('Should when add user resp fail', fakeAsync(()=>{
    const mockUser:User={
    name:"Pinco Pallino",
    email:"pincopallo@gmail.com",
    gender:"male",
    status:"active"
    }
    const mockResp= new HttpResponse({body:mockUser, status:401})
    spyOn(service,"addUser").and.returnValue(of(mockResp))
    component.addUser(mockUser)
    flush() 
    expect(401).toEqual(mockResp.status)

  }))

  it('Should when edit user resp 200', fakeAsync(()=>{
    const mockUser:User={
    name:"Pinco Pallyino",
    email:"pincopallot@gmail.com",
    gender:"female",
    status:"active",
    
    }
    const mockResp= new HttpResponse({body:mockUser,status:200})
    spyOn(service,"editUser").and.returnValue(of(mockResp))
    component.editUser(mockUser,"3445")
    flush() 
    expect(200).toEqual(mockResp.status)

  }))
  it('Should when edit user resp fail', fakeAsync(()=>{
    const mockUser:User={
    name:"Pinco Pallyino",
    email:"pincopallot@gmail.com",
    gender:"female",
    status:"active",
    
    }
    const mockResp= new HttpResponse({body:mockUser,status:401})
    spyOn(service,"editUser").and.returnValue(of(mockResp))
    component.editUser(mockUser,"3445")
    flush() 
    expect(401).toEqual(mockResp.status)

  }))
  
});
