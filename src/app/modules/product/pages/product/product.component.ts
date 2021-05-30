import { Component, OnInit } from '@angular/core';
import { ProductsService } from './../../services/products.service'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(
    private productsService : ProductsService
  ) { }

  ngOnInit(): void {
    this.callGetProducts();
  }

  callGetProducts(){
    console.log('Call to Get Products');
  }

}
