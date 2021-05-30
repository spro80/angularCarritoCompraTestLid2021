import { Component, OnInit } from '@angular/core';
import { ProductsService } from './../../../app/modules/product/services/products.service'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor( private productsService : ProductsService) { }

  cart = Array();
  productsList = Array();
  chunkArray = Array();
  discountsList = Array();
  discountsHash = Array();

  
  ngOnInit(): void {
    this.callGetProducts();
    this.callGetDiscounts();
  }

  cleanCart(){
    localStorage.removeItem('infoCart');
    console.log( JSON.parse(localStorage.getItem('infoCart') || '{}' ) );
  }

  addProduct(itemId:number, brand:String, price: Number, description: String){
    if( this.cart[itemId] === undefined ){
      this.cart[itemId] = new Object();
      this.cart[itemId].quantity = 1;
      this.cart[itemId].price = price;
      this.cart[itemId].description = description;
      this.cart[itemId].brand = brand;
    }else{
      this.cart[itemId].quantity += 1;
    }

    localStorage.setItem('infoCart', JSON.stringify(this.cart));
    console.log( JSON.parse(localStorage.getItem('infoCart') || '{}' ) );
  
    let total = this.totalCart( );
    console.log( "total a pagar: " );
    console.log( total );
    this.discountsHash = this.discountsToHash();
    console.log( this.discountsHash );
    this.totalCartByBrand()
  }


  getInfoDiscounts() {
    console.log(this.discountsList);
  }


  totalCart(): Number {
    console.log("\n\n\nCALCULANDO TOTAL:");

    let cart = JSON.parse(localStorage.getItem('infoCart') || '{}');
    console.log("\n\n\nCALCULANDO TOTAL mostrar object hash:");
    
    let totalCart = 0;
    for (var [key, value] of Object.entries( cart )) {
      console.log(key);
      console.log(value);

      if( value === null ){
        console.log( "el value es null para el id de cart" );
      } else {
        console.log( cart[key].quantity );
        console.log( cart[key].price );
        totalCart += (cart[key].quantity * cart[key].price);
      }
    }
    console.log("\n\n\nCALCULANDO TOTAL mostrar object hash:");
    return totalCart;
  }

  removeMarcaInBrand( brand: String ){
    return brand.replace('Marca', '');
  }

  discountsToHash() {
    let discountsHash = new Array();
    let removeStringInBrand = 'Marca';
    let brand = '';

    for(let i=0; i<this.discountsList.length; i++) {
      brand = this.discountsList[i].brand;
      let numberInBrand = parseInt(brand.replace(removeStringInBrand, ''));
     
      if (discountsHash[numberInBrand] === undefined){
        discountsHash[numberInBrand] = new Object();
        discountsHash[numberInBrand].brand =  this.discountsList[i].brand;
        discountsHash[numberInBrand].threshold =  this.discountsList[i].threshold;
        discountsHash[numberInBrand].discount =  this.discountsList[i].discount;
      }
    }
    return discountsHash;
  }



  totalCartByBrand() {

    console.log("*******************TOTAL CART BY BRAND INIT*******************------------------");
    let cart = JSON.parse(localStorage.getItem('infoCart') || '{}');
    console.log("\n\n\nCALCULANDO TOTAL mostrar object hash:");
    let cartByBrand = Array();
    let totalCart = 0;
    
    for (var [key, value] of Object.entries( cart )) {
      console.log("*****************************************************");
      console.log(key);
      console.log(value);

      if( value === null ){
        console.log( "el value es null para el id recorrido" );
      } else {
        console.log( "el value no es null para el id recorrido" );
        console.log( cart[key].quantity );
        console.log( cart[key].price );
        console.log( cart[key].brand );
        let brand = cart[key].brand;
        console.log( brand );
        let brandNumber = parseInt(this.removeMarcaInBrand( brand ));
        console.log( brandNumber );

        if( this.discountsHash[brandNumber].totalAcumulative === undefined ){
          console.log("ENTRO EN EL IFFF de undefined");
          this.discountsHash[brandNumber].totalAcumulative = (cart[key].quantity * cart[key].price);
          console.log( this.discountsHash[brandNumber].totalAcumulative );
          console.log( 'threshold::: '+this.discountsHash[brandNumber].threshold );
          console.log( 'discount::: '+this.discountsHash[brandNumber].discount );
          let threshold = this.discountsHash[brandNumber].threshold;
          let discount = this.discountsHash[brandNumber].discount;
          let acumulative = this.discountsHash[brandNumber].totalAcumulative;
          
          if( this.discountsHash[brandNumber].totalAcumulative < threshold ){
            let difference = threshold - acumulative;
            let message = `Agrega ${difference} más en productos Marca${brandNumber} y aprovecha un descuento total de ${this.discountsHash[brandNumber].discount} en tu compra!`;
            console.log(message);
            console.log(difference);
          } else {
            let message2 = `Se aplicó un descuento de ${discount} por haber comprado ${threshold} de productos Marca${brandNumber}!`;
            console.log(message2);
          }
        }else {
          console.log("ENTRO EN ELSE de undefined");
          this.discountsHash[brandNumber].totalAcumulative += (cart[key].quantity * cart[key].price);
          console.log( this.discountsHash[brandNumber].totalAcumulative );
          console.log( 'threshold::: '+this.discountsHash[brandNumber].threshold );
          console.log( 'discount::: '+this.discountsHash[brandNumber].discount );

          let threshold = this.discountsHash[brandNumber].threshold;
          let acumulative = this.discountsHash[brandNumber].totalAcumulative;
          let discount = this.discountsHash[brandNumber].discount;

          if( this.discountsHash[brandNumber].totalAcumulative < threshold ){
            let difference = threshold - acumulative;
            let message = `Agrega ${difference} más en productos Marca${brandNumber} y aprovecha un descuento total de ${this.discountsHash[brandNumber].discount} en tu compra!`;
            console.log(message);
            console.log(difference);
          } else {
            let message2 = `Se aplicó un descuento de ${discount} por haber comprado ${threshold} de productos Marca${brandNumber}!`;
            console.log(message2);
          }          
        }

        //this.discountsHash[brandNumber].totalAcumulative += (cart[key].quantity * cart[key].price);
        //console.log( this.discountsHash[brandNumber].totalAcumulative );
        //totalCart += (cart[key].quantity * cart[key].price);
      }
    }
    console.log("*******************TOTAL CART BY BRAND END*******************------------------");
  }


  callGetProducts(){
    console.log('Call to Get Products');
    //this.productsService.createBodyProducts
    
    let products = Array();
    this.productsService.getProducts$( )
      .subscribe( (data: any) => {
        //console.log(data);
        //console.log(data.products);
        this.productsList = data.products;
        products = data.products;
        console.log(products);

        //let arr = [1,2,3,4,5,6,7,8];
        let chunk_size = 3; //no. of elements you want to print in single row
        this.chunkArray = products.map(function(e, i) {
          return i % chunk_size === 0 ? products.slice(i, i + chunk_size) : null;
        })
        .filter(function(e) {
          return e;
        });

      });
    }

  callGetDiscounts(){
    console.log('Call to Get Discounts');
    this.productsService.getDiscounts( )
      .subscribe( (data: any) => {
        console.log(data);
        this.discountsList = data.discounts;
      });
  }

}
