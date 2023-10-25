import { Component, OnInit } from '@angular/core';

import { customer } from '../customer';
import { customerService } from '../customer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class customersComponent implements OnInit {
    customers: customer[] = [];
    closeResult: string | undefined;
    modalContent!: customer;
  constructor(private customerService: customerService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getcustomers();
  }

  getcustomers(): void {
    this.customerService.getcustomers()
    .subscribe(customers => this.customers = customers);
  }

  open(content: any, tableRow: customer) {
    //this.modalContent = content;
    this.modalContent = tableRow
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
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
