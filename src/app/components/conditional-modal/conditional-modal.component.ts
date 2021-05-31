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

  totalCartStorage : String = '';
  totalDiscountStorage : String = '';
  totalDiscountCartStorage : String = '';
  totalWithDiscountCartStorage : String = '';
  constructor() {
  }

  ngOnInit() {
    
    this.productsList = JSON.parse(sessionStorage.getItem('infoCart') || '{}' );

    this.totalCartStorage = JSON.stringify(sessionStorage.getItem('totalCartModal'));

    this.totalDiscountCartStorage = JSON.stringify(sessionStorage.getItem('totalDiscountCartModal'));

    this.totalWithDiscountCartStorage = JSON.stringify(sessionStorage.getItem('totalWithDiscountCartModal'));

    this.productsListClean = this.productsList.filter( elem => {
      return elem !== null
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
