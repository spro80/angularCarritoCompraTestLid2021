//import { TestBed } from '@angular/core/testing';
//import { Observable, of } from 'rxjs';

//import { ProductsService } from './products.service';

//import { HttpClientTestingModule } from '@angular/common/http/testing';
//import { HttpClientModule } from '@angular/common/http';



import { TestBed, inject } from '@angular/core/testing';
import { Observable, throwError, of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { ProductsService } from './products.service';

//import { MsCallService } from './ms-call.service';
//import { CommonResponse } from '../../shared/models/common-response';
//import { CommonResponseReportCenter } from '../../shared/models/common-response-report-center';




const getProducts = {
  status: {
    code: 200,
    message: ''
  }
};


let productService: ProductsService;
let httpMock: HttpTestingController;


/*
describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsService);
  });

  it.skip('should be created', () => {
    expect(service).toBeTruthy();
  });

});
*/


describe('ProductsService', () => {
  
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [ProductsService]
    });
  });

  beforeEach(
    inject([ProductsService, HttpTestingController], (_service:any, _httpMock:any) => {
      productService = _service;
      httpMock = _httpMock;
    }));

  it('should be created', inject([ProductsService], (service: ProductsService) => {
    expect(service).toBeTruthy();
  }));

  it.skip('should validate createURL', inject([ProductsService], (service: ProductsService) => {
    let dynamicUrl = productService.createURL('http://localhost:3000', '/api/products/getProducts');
    expect(dynamicUrl).toEqual("http://localhost:3000/api/products/getProducts");
  }));

  it('should return an Observable for getProducts$', inject([ProductsService], (service: ProductsService) => {
    const body = { };
    const GETPRODUCT_OBJECT: any = {
      status:  {
        code: 200,
        message: '',
        product: []
      }
    };
    productService.getProducts$().subscribe((data) => {
      expect(data).toEqual(GETPRODUCT_OBJECT);
    });
    const req = httpMock.expectOne( { method: 'GET', url:'http://localhost:3000/api/products/getProducts' } );
    req.flush(GETPRODUCT_OBJECT);
    httpMock.verify();      
  }));

  it('should return an Observable for getDiscounts', inject([ProductsService], (service: ProductsService) => {
      const body = { };
      const GETDISCOUNT_OBJECT: any = {
        status:  {
          code: 200,
          message: '',
          discount: []
        }
      };
      productService.getDiscounts().subscribe((data) => {
        expect(data).toEqual(GETDISCOUNT_OBJECT);
      });
      const req = httpMock.expectOne( { method: 'GET', url:'http://localhost:3000/api/products/getDiscounts' } );
      req.flush(GETDISCOUNT_OBJECT);
      httpMock.verify();      
  }));

});
