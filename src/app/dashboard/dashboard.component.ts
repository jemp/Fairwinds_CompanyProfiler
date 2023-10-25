import { Component, OnInit } from '@angular/core';
import { customer } from '../customer';
import { customerService } from '../customer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  customers: customer[] = [];

  constructor(private customerService: customerService) { }

  ngOnInit(): void {
    this.getcustomers();
  }

  getcustomers(): void {
    this.customerService.getcustomers()
      .subscribe(customers => this.customers = customers.slice(1, 5));
  }
}
