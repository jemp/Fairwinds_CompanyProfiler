import { Component, OnInit } from '@angular/core';

import { customer } from '../customer';
import { customerService } from '../customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class customersComponent implements OnInit {
  customers: customer[] = [];

  constructor(private customerService: customerService) { }

  ngOnInit(): void {
    this.getcustomers();
  }

  getcustomers(): void {
    this.customerService.getcustomers()
    .subscribe(customers => this.customers = customers);
  }

  //add(name: string): void {
  //  name = name.trim();
  //  if (!name) { return; }
  //  this.customerService.addcustomer({ name } as customer)
  //    .subscribe(customer => {
  //      this.customers.push(customer);
  //    });
  //}

  delete(customer: customer): void {
    this.customers = this.customers.filter(h => h !== customer);
    this.customerService.deletecustomer(customer.customer_number).subscribe();
  }

}
