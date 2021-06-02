import { Component, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
//import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { ProductsService } from './../../../app/modules/product/services/products.service'


import { Observable, of } from 'rxjs';



class MockProductService {
  public response = {
    status: {
      code: 2000,
      message: 'success'
    }
  };

  /*productService(): Observable<any> {
    return of(this.response);
  }*/

  

  getProducts$(): Observable<any> {
    return of(this.response);
  }

  getDiscounts(): Observable<any> {
    return of(this.response);
  }

  

}


describe('ProductsComponent', () => {
  let component: ProductsComponent;
  //let fixture: ComponentFixture<ProductsComponent>;
  let productsService: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsComponent 
      ],
      imports: [
        HttpClientModule
      ],
      providers: [
        ProductsComponent,
        { provide: ProductsService, useClass: MockProductService }
      ],
    })
    .compileComponents();
    component = TestBed.get(ProductsComponent);
    productsService = TestBed.get(ProductsService);
  });

  /*
  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });*/

  it('should create', inject([ProductsComponent], () => {
    expect(component).toBeTruthy();
  }));


  it.skip('ngOnInit', () => {
    component.ngOnInit();
  });

  
});
