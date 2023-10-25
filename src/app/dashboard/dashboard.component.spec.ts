import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {RouterModule} from '@angular/router';
import {of} from 'rxjs';

import {customerSearchComponent} from '../customer-search/customer-search.component';
import {customerService} from '../customer.service';
import {customers} from '../mock-customers';

import {DashboardComponent} from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let customerService;
  let getcustomersSpy: jasmine.Spy;

  beforeEach(waitForAsync(() => {
    customerService = jasmine.createSpyObj('customerService', ['getcustomers']);
    getcustomersSpy = customerService.getcustomers.and.returnValue(of(customers));
    TestBed
        .configureTestingModule({
          declarations: [DashboardComponent, customerSearchComponent],
          imports: [RouterModule.forRoot([])],
          providers: [
            {provide: customerService, useValue: customerService},
          ]
        })
        .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Top customers" as headline', () => {
    expect(fixture.nativeElement.querySelector('h2').textContent).toEqual('Top customers');
  });

  it('should call customerService', waitForAsync(() => {
       expect(getcustomersSpy.calls.any()).toBe(true);
     }));

  it('should display 4 links', waitForAsync(() => {
       expect(fixture.nativeElement.querySelectorAll('a').length).toEqual(4);
     }));
});
