import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, of, tap } from 'rxjs';
import { CustomerProfile } from './CustomerProfile';

@Injectable({
  providedIn: 'root'
})
export class CustomerProfilerService {

  private apiServiceEndpoint = 'https://my.api.mockaroo.com/customers.json?key=e95894a0';  // URL to web api

  constructor(
    private http: HttpClient) {

  }


  /** GET heroes from the server */
  getCustomers(): Observable<CustomerProfile[]> {
    return this.http.get<CustomerProfile[]>(this.apiServiceEndpoint)
  }




}
