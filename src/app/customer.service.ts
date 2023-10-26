import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { customer } from './customer';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class customerService {

  private customersUrl = 'https://my.api.mockaroo.com/customers.json?key=03c46990&size=5';  // URL to web api

  httpOptions = {
    observe: 'response' as const,
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }
    )
   
  };
    httpResponse: any;

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET customers from the server */
  getcustomers(): Observable<customer[]> {
    return this.http.get<customer[]>(this.customersUrl)
      .pipe(
        tap(_ => this.log('fetched customers')),
        catchError(this.handleError<customer[]>('getcustomers', []))
      );
  }

  /** GET customer by id. Return `undefined` when id not found */
  getcustomerNo404<Data>(id: number): Observable<customer> {
    const url = `${this.customersUrl}/?id=${id}`;
    return this.http.get<customer[]>(url)
      .pipe(
        map(customers => customers[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} customer id=${id}`);
        }),
        catchError(this.handleError<customer>(`getcustomer id=${id}`))
      );
  }

  /** GET customer by id. Will 404 if id not found */
  getcustomer(id: number): Observable<customer> {
    const url = `${this.customersUrl}/${id}`;
    return this.http.get<customer>(url).pipe(
      tap(_ => this.log(`fetched customer id=${id}`)),
      catchError(this.handleError<customer>(`getcustomer id=${id}`))
    );
  }

  /* GET customers whose name contains search term */
  searchcustomers(term: string): Observable<customer[]> {
    if (!term.trim()) {
      // if not search term, return empty customer array.
      return of([]);
    }
    return this.http.get<customer[]>(`${this.customersUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found customers matching "${term}"`) :
         this.log(`no customers matching "${term}"`)),
      catchError(this.handleError<customer[]>('searchcustomers', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new customer to the server */
  addcustomer(customer: customer): Observable<any> { 
    return this.http.post<customer>(this.customersUrl, customer, this.httpOptions)
    ;
    
  }

  /** DELETE: delete the customer from the server */
  deletecustomer(id: number): Observable<any> {
    const url = `${this.customersUrl}/${id}`;

    return this.http.delete<customer>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted customer id=${id}`)),
      catchError(this.handleError<customer>('deletecustomer'))
    );
  }

  /** PUT: update the customer on the server */
  updatecustomer(customer: customer): Observable<any> {
    return this.http.put(this.customersUrl, customer, this.httpOptions).pipe(
      tap(_ => this.log(`updated customer id=${customer.customer_number}`)),
      catchError(this.handleError<any>('updatecustomer'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a customerService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`customerService: ${message}`);
  }
}
