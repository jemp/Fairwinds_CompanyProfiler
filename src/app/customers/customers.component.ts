import { Component, OnInit } from '@angular/core';

import { PrimaryAddress, customer } from '../customer';
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
    httpResponse: any;
  constructor(private customerService: customerService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getcustomers();
  }

  getcustomers(): void {
    this.customerService.getcustomers()
    .subscribe(customers => this.customers = customers);
  }

  open(content: any, tableRow?: customer) {
    //this.modalContent = content;
    this.modalContent = tableRow ? tableRow : new customer(0, "", "", "", "", "", new PrimaryAddress("", "", "", 0), "", "");
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
 

  add(first_name: string, last_name: string, date_birth: string, ssn: string, email: string, primary_address: PrimaryAddress, mobile_phone_number: string, join_date: string): void {
    ///some sort of validation?
    this.customerService.addcustomer({ first_name, last_name, date_birth, ssn, email, primary_address, mobile_phone_number, join_date } as customer)
      .subscribe(result => this.httpResponse = result);
 
  }

  delete(customer: customer): void {
    this.customers = this.customers.filter(h => h !== customer);
    this.customerService.deletecustomer(customer.customer_number).subscribe();
  }

}
