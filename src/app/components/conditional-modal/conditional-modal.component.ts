import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'conditional-modal',
  templateUrl: './conditional-modal.component.html',
  styleUrls: ['./conditional-modal.component.scss']
})
export class ConditionalModalComponent implements OnInit {

  @Input() public titleModal: string = '';
  @Input() public informationModal: string = '';
  @Input() public nameNegCondition: string = '';
  @Input() public namePosCondition: string = '';
  @Output() selectedButton = new EventEmitter<any>();

  productsList = Array();
  productsListClean = Array();

  discountsHash = Array();
  discountsHashClean = Array();
  messageAddProducts = Array();
  messageApplyDiscounts = Array();

  totalCartStorage : String = '';
  totalDiscountStorage : String = '';
  totalDiscountCartStorage : String = '';
  totalWithDiscountCartStorage : String = '';

  existDiscount: Boolean = false;

  constructor() {
  }

  ngOnInit() {
    
    this.productsList = JSON.parse(sessionStorage.getItem('infoCart') || '{}' );

    this.totalCartStorage = JSON.stringify(sessionStorage.getItem('totalCartModal'));

    this.totalDiscountCartStorage = JSON.stringify(sessionStorage.getItem('totalDiscountCartModal'));
    if( this.totalDiscountCartStorage === "0"){
      this.existDiscount = false;
    }else{
      this.existDiscount = true;
    }

    this.totalWithDiscountCartStorage = JSON.stringify(sessionStorage.getItem('totalWithDiscountCartModal'));
 

    this.productsListClean = this.productsList.filter( elem => {
      return elem !== null
    });

    this.discountsHash = JSON.parse(sessionStorage.getItem('discountsHash') || '{}' );
    this.discountsHashClean = this.discountsHash.filter( (elem) => {
      return elem!== null && elem.message !== ''
    });

    this.messageAddProducts = this.discountsHashClean.filter( (elem) => {
      return elem.typeMessage === 1;
    });

    this.messageApplyDiscounts = this.discountsHashClean.filter( (elem) => {
      return elem.typeMessage === 2;
    });


  }

  onSelect(selected: 'pos' | 'neg') {
    this.selectedButton.emit(selected);
  }

  goToCheckout(){
    alert('Checkout is not implemented!');
  }

  removeItemInCart(){
    alert('remove item is not implemented!');
  }

}
