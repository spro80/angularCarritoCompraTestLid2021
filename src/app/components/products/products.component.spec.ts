import { Component, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
//import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { ProductsService } from './services/products.service'


import { Observable, of } from 'rxjs';



class MockProductService {
  public response = {
    status: {
      code: 2000,
      message: 'success'
    }
  };

  getProducts$(): Observable<any> {
    return of(this.response);
  }

  getDiscounts(): Observable<any> {
    return of(this.response);
  }

}

let component: ProductsComponent;
let productsService: ProductsService;
describe('ProductsComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsComponent
      ],
      imports: [
        HttpClientModule
      ],
      providers: [
        ProductsComponent,
        { provide: ProductsService, useClass: MockProductService }
      ]
    })
    //.compileComponents();
    //component = TestBed.get(ProductsComponent);
    //productsService = TestBed.get(ProductsService);
  });

  beforeEach(() => {
    TestBed.compileComponents();
});

  


  it.skip('should create component', (inject([ProductsService],(productsService:any) => {
    var fixture = TestBed.createComponent(ProductsComponent);
    fixture.detectChanges();
    var compiled = fixture.debugElement.nativeElement;
    console.log(productsService);
  })));


it.skip('Validate', (inject([ProductsService],(productsService:any) => {
  var fixture = TestBed.createComponent(ProductsComponent);
  fixture.detectChanges();
  var compiled = fixture.debugElement.nativeElement;
  console.log(productsService);
  component.removeMarcaInBrand('Marca1');
  expect(component).toEqual(1);
})));

  
});
