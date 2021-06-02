import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Subject } from 'rxjs';

export interface Product {
  brand: String;
  description: String;
  id: Number;
  image: String;
  price: Number;
}

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  private urlBase: String;
  private productPath: String;
  private discountPath: String;

  private products: Product[];
  private products$: Subject<Product[]>

  constructor( private http: HttpClient ) {
    this.urlBase = 'http://localhost:3000';
    this.productPath = '/api/products/getProducts';
    this.discountPath = '/api/products/getDiscounts';

    this.products = [];
    this.products$ = new Subject();
  }


  createURL(url: String, path: String) {
    return `${url}${path}`;
  }


  //getProducts( ): Observable<Product> {
  /*getProducts( ) {
    const headers = {}; //this.createHeaders( accessToken );
    const urlApiRequest = this.createURL(this.urlBase, this.productPath);
    console.log( urlApiRequest );
    return this.http.get(urlApiRequest, { headers })
              .pipe( map( data => {
                return data;
              }))
  }*/


  
  /*
  TODO: Create request with autorization, use JWT for request. The API must add middleware for validation of token. 
  createHeaders( accessToken ) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });
    return headers;
  }
  */

  getProducts$(): Observable<Product[]> {
    const headers = {}; //this.createHeaders( accessToken );
    const urlApiRequest = this.createURL(this.urlBase, this.productPath);
    return this.http.get<any[]>(urlApiRequest)
      .pipe( map( data => {
        return data;
      }))
  }

  getDiscounts( ) {
    console.log("[products.service.ts] getDiscounts!!!");
    //const accessToken = 'BQBW6wm4cquoZMXDnk-yJm6LQeHSoQYgb75LxqG7WmSzDUWiIq83KGho0xjndsTlxg4bqvhVCXKsRKrSJPA';
    const headers = {}; //this.createHeaders( accessToken );
    const urlRequest = this.createURL(this.urlBase, this.discountPath);
    console.log( urlRequest );

    return this.http.get(urlRequest, { headers })
              .pipe( map( data => {
                return data;
              }))
  }


}


