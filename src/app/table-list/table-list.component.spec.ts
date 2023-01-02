import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import {  MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { User } from '../model';
import { HttpService } from '../services/http.service';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { TableListComponent } from './table-list.component';

describe('TableListComponent', () => {
  let component: TableListComponent;
  let fixture: ComponentFixture<TableListComponent>;
  let service: HttpService
  let httpClientSpy: { delete: jasmine.Spy , get:jasmine.Spy};
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableListComponent],
      imports:[HttpClientTestingModule,
        MatTableModule,
        RouterModule.forRoot([]),
        MatPaginatorModule,
        BrowserAnimationsModule ],
       schemas: [CUSTOM_ELEMENTS_SCHEMA]
      
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableListComponent);
    httpClientSpy=jasmine.createSpyObj('HttpClient', ['get','delete'])
    service = new HttpService(httpClientSpy as any)
    component = new TableListComponent(service);
    
    
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should  get User', fakeAsync(()=>{
    const mockUser:User={
    name:"Pinco Pallino",
    email:"pincopallo@gmail.com",
    gender:"male",
    status:"active"
    }
    const mockUsers:User[]=[]
    mockUsers.push(mockUser)
    const mockResp= new HttpResponse({body:mockUsers, status:200})
    spyOn(service,"getUserList").and.returnValue(of(mockResp))
    component.getUser("1","1","")
    flush() 
    expect(200).toEqual(mockResp.status)

  }))

it('Should search some term',()=>{
  component.search("wew")
  expect(true)
})

it('Should search email term',()=>{
  component.search("wew@test.it")
  expect(true)
})




});
