import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { customer } from './customer';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const customers = [
      { id: 12, name: 'Dr. Nice' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr. IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    return {customers};
  }

  // Overrides the genId method to ensure that a customer always has an id.
  // If the customers array is empty,
  // the method below returns the initial number (11).
  // if the customers array is not empty, the method below returns the highest
  // customer id + 1.
  genId(customers: customer[]): number {
    return customers.length > 0 ? Math.max(...customers.map(customer => customer.customer_number)) + 1 : 11;
  }
}
