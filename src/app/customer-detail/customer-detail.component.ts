import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { customer } from '../customer';
import { customerService } from '../customer.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: [ './customer-detail.component.css' ]
})
export class customerDetailComponent implements OnInit {
  customer: customer | undefined;

  constructor(
    private route: ActivatedRoute,
    private customerService: customerService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getcustomer();
  }

  getcustomer(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.customerService.getcustomer(id)
      .subscribe(customer => this.customer = customer);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.customer) {
      this.customerService.updatecustomer(this.customer)
        .subscribe(() => this.goBack());
    }
  }
}
