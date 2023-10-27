import { Component, OnInit } from '@angular/core';

import { PrimaryAddress, customer } from '../customer';
import { customerService} from '../customer.service';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {
  result: any;
  notFaulted: boolean = true;


  constructor(private customerService: customerService) { }

  ngOnInit(): void {

  }


  model = new customer(0, "", "", new Date(), "", "", new PrimaryAddress("", "", "", 0), "", "");

  submitted = false;

  onSubmit() {
    this.customerService.addcustomer(this.model).subscribe(response => {
      this.result = response.status;
      if (this.result == 201) {
        this.submitted = true;
      }
    },
      err => {
          this.notFaulted = false;

      }
    )
  }
}
    


