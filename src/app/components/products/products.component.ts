import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ProductsService } from './services/products.service'

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
  controlMessageInformative : Boolean = false;

  ngOnInit(): void {
    this.callGetProducts();
    this.callGetDiscounts();
  }


  callGetProducts(){
    console.log('[callGetProducts] Init in method');  
    let products = Array();
    this.productsService.getProducts$( )
      .subscribe( (data: any) => {
        console.log(data);
        
        if(data.statusCode !== 200){
          this.controlMessageInformative = true;
        }
        
        this.productsList = data.products;
        products = data.products;

        let chunk_size = 3;
        this.chunkArray = products.map(function(e, i) {
          return i % chunk_size === 0 ? products.slice(i, i + chunk_size) : null;
        })
        .filter(function(e) {
          return e;
        });

      },
      (error) => {
        this.controlMessageInformative = true;
      }
      );
  }


  callGetDiscounts(){
    console.log('[callGetDiscounts] Init in method');  
    this.productsService.getDiscounts( )
      .subscribe( (data: any) => {
        console.log(data);

        if(data.statusCode !== 200){
          this.controlMessageInformative = true;
        }

        this.discountsList = data.discounts;
        this.discountsHash = this.discountsToStructureHash( this.discountsList );
      },
      (error) => {
        this.controlMessageInformative = true;
      }
      );
  }


  discountsToStructureHash( discountList: any ) {
    console.log('[discountsToHash] Init in method');
    let discountsHash = new Array();
    let removeStringInBrand = 'Marca';
    let brand = '';

    for(let i=0; i<discountList.length; i++) {
      brand = discountList[i].brand;
      let numberInBrand = parseInt(brand.replace(removeStringInBrand, ''));
      
      if (discountsHash[numberInBrand] === undefined){
        discountsHash[numberInBrand] = new Object();
        discountsHash[numberInBrand].brand =  discountList[i].brand;
        discountsHash[numberInBrand].threshold =  discountList[i].threshold;
        discountsHash[numberInBrand].discount =  discountList[i].discount;
        discountsHash[numberInBrand].totalByBrand = 0;
        discountsHash[numberInBrand].message = '';
        discountsHash[numberInBrand].typeMessage = 0;
      }
    }
    console.log('[discountsToHash] return: ');
    console.log(discountsHash);
    return discountsHash;
  }


  discountsResetMessageDiscount( ) {
    console.log('[discountsResetMessageDiscount] Init in method');

    this.discountsHash = this.discountsHash.map( (elem, key) => {
      if ( elem.message !== '') {
        elem.message = '';
      }
      if( elem.typeMessage !== 0) {
        elem.typeMessage = 0;
      }
      if( elem.totalByBrand !== 0) {
        elem.totalByBrand = 0;
      }
      return elem;
    });
  }


  subtractProduct( itemId:number ){
    console.log('subtractProduct: '+ itemId);

    let cartStorage = JSON.parse(sessionStorage.getItem('infoCart') || '{}' );    
    
    let totalCart = 0;
    let flagUpdateTotal = false;
    let existProductInCart = false;
    for (var [key, value] of Object.entries( cartStorage )) {
      if( value !== null ){
        totalCart += (cartStorage[key].quantity * cartStorage[key].price);

        if( String(itemId) === key ) {
          existProductInCart = true;
          if( cartStorage[key].quantity > 0){
            cartStorage[key].quantity -= 1; 
            flagUpdateTotal = true;
          }else {
            existProductInCart = false;
            flagUpdateTotal = false;
          }

        }
      }
    }

    if( flagUpdateTotal ){
      this.discountsResetMessageDiscount( );
      
      sessionStorage.setItem('infoCart', ''+JSON.stringify(cartStorage));

      let cartStorageUpdated = JSON.parse(sessionStorage.getItem('infoCart') || '{}' );
    
      let total = this.totalCart( cartStorageUpdated );

      this.calculateTotalPriceByBrand( cartStorageUpdated );

      let totalDiscounts = this.calculateTotalDiscount( );

      this.calculateTotalWithDiscounts( total, totalDiscounts );
    }

  }

  addProduct(itemId:number, brand:String, price: Number, description: String){
    console.log('[addProduct] Init in method');
    
    if( this.cart[itemId] === undefined ) {
      this.cart[itemId] = new Object();
      this.cart[itemId].quantity = 1;
      this.cart[itemId].price = price;
      this.cart[itemId].description = description;
      this.cart[itemId].brand = brand;
    }else{
      this.cart[itemId].quantity += 1;
    }

    sessionStorage.setItem('infoCart', ''+JSON.stringify(this.cart));
    // console.log( JSON.parse(sessionStorage.getItem('infoCart') || '{}' ) );

    this.discountsHash = this.discountsToStructureHash( this.discountsList );

    let cartStorage = JSON.parse(sessionStorage.getItem('infoCart') || '{}' );
  
    let total = this.totalCart( cartStorage );

    this.calculateTotalPriceByBrand( cartStorage );

    let totalDiscounts = this.calculateTotalDiscount( );

    this.calculateTotalWithDiscounts( total, totalDiscounts );
  }


  totalCart( cartStorage: any ): number {
    console.log('[totalCart] Init in method');

    let totalCart = 0;
    for (var [key, value] of Object.entries( cartStorage )) {
      console.log(key);
      console.log(value);

      if( value !== null ){
        console.log( cartStorage[key].quantity );
        console.log( cartStorage[key].price );
        totalCart += (cartStorage[key].quantity * cartStorage[key].price);
      }
    }
    
    sessionStorage.setItem('totalCartModal', ''+totalCart);
    return totalCart;
  }

  calculateTotalPriceByBrand( cartStorage: any ) {
    console.log('[calculateTotalPriceByBrand] Init in method');

    let quantity;
    let price;
    let brand;
    let brandNumber;
    let threshold;
    let discount;
    let totalByProduct;
    for (var [key, value] of Object.entries( cartStorage )) {

      if( value !== null ){
        quantity = cartStorage[key].quantity;
        price = cartStorage[key].price;
        totalByProduct = quantity * price; 
        brand = cartStorage[key].brand;
        brandNumber = parseInt(this.removeMarcaInBrand( brand ));
        threshold = this.discountsHash[brandNumber].threshold;
        discount = this.discountsHash[brandNumber].discount;

        this.discountsHash[brandNumber].totalByBrand += totalByProduct;
      }
    }

  }


  calculateTotalDiscount( ) {
    console.log('[calculateTotalDiscount] Init in method');

    let totalByBrand;
    let threshold;
    let discount;
    let brandNumber;
    let totalDiscounts : number = 0;
    let messageAddMoreProduct = '';
    let messageDiscountsByBrand = '';

    for (var [key, value] of Object.entries( this.discountsHash )) {
      console.log(key, value, value.totalByBrand, value.threshold, value.discount);
      totalByBrand = value.totalByBrand;
      threshold = value.threshold;
      discount = value.discount;
      brandNumber = key;
      // console.log("key, value, totalByBrand, threshold, discount", key, value, totalByBrand, threshold, discount );
        
      if( totalByBrand > 0) {
        if( totalByBrand < threshold ){
          let difference = threshold - totalByBrand;
          messageAddMoreProduct = `Agrega $${difference} más en productos Marca${brandNumber} y aprovecha un descuento total de $${discount} en tu compra!`;
          this.discountsHash[parseInt(brandNumber)].message = messageAddMoreProduct;
          this.discountsHash[parseInt(brandNumber)].typeMessage = 1;

        } else {
          messageDiscountsByBrand = `* Se aplicó un descuento de $${discount} por haber comprado $${threshold} de productos Marca${brandNumber}!`;
          totalDiscounts += discount;
          this.discountsHash[parseInt(brandNumber)].message = messageDiscountsByBrand;
          this.discountsHash[parseInt(brandNumber)].typeMessage = 2;
        }
      }
    }
    sessionStorage.setItem('totalDiscountCartModal', ''+totalDiscounts);

    sessionStorage.setItem('discountsHash', ''+JSON.stringify(this.discountsHash));

    console.log(this.discountsHash);
    return totalDiscounts;
  }


  calculateTotalWithDiscounts( totalCart: number, totalDiscounts: number ) {

    console.log('[calculateTotalWithDiscounts] Init in method');
    let totalFinal: number = 0;
    totalFinal = totalCart - totalDiscounts;

    sessionStorage.setItem('totalWithDiscountCartModal', ''+totalFinal);

    console.log('[calculateTotalWithDiscounts] return totalFinal:');
    console.log(totalFinal);
    return totalFinal;
  }



  cleanCart() {

    sessionStorage.removeItem('infoCart');

    sessionStorage.removeItem('totalCartModal');

    sessionStorage.removeItem('totalDiscountCartModal');

    sessionStorage.removeItem('totalWithDiscountCartModal');

    sessionStorage.removeItem('discountsHash');
  }

  removeMarcaInBrand( brand: String ){
    return brand.replace('Marca', '');
  }

  viewProduct(){
    alert("Method viewProduct is not implemented");
  }

  removeProduct(){
    alert("Method removeProduct is not implemented");
  }

}
