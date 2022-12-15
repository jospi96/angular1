import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ViewPostComponent } from './view-post.component';

import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ViewPostComponent', () => {
  let component: ViewPostComponent;
  let fixture: ComponentFixture<ViewPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPostComponent ],
      imports:[HttpClientTestingModule,
        RouterModule.forRoot([]),],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewPostComponent);
    component = fixture.componentInstance;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
