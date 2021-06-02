import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { ProductsService } from './products.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';



const getProducts = {
  status: {
    code: 200,
    message: ''
  }
};


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
