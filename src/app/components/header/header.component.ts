import { Component, OnInit } from '@angular/core';
import { StructureModalWindow } from 'src/app/components/modal-window/StructureModalWindow';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  message: String = '';
  showModalBox: boolean = false;

  infoModal: StructureModalWindow = new StructureModalWindow('', '', '', '', false);
  modalInformativeOpen: boolean = false;
  modalOpen: boolean = false;

  titleModal: string = '';
  informationModal: string = '';
  namePosCondition: string = '';
  nameNegCondition: string= '';

  ngOnInit(): void {

  }

  public openModal(modalId: string) {

    if( this.validateShoppinCart() ) {
      this.modalOpen = true;
      this.modalInformativeOpen = true;
      const title = '';
      const information = '';
      const nameButton = '';
      this.infoModal = new StructureModalWindow(title, information, nameButton, modalId, false);
    }

  }

  validateShoppinCart() {
    let a = JSON.parse(sessionStorage.getItem('infoCart') || '{}' );
    let validate = false;
    if( a.length === undefined ) {
      alert("todo: PENDING CREATE OTHER MODAL WITH MESSAGE.  There is not elements in the shopping cart. ");
      validate = false;
    }else {
      validate = true;
    }

    return validate;
  }


  action(action: 'pos' | 'neg') {
    if (action === 'neg') {
      this.modalOpen = false;
    }
  }

  cleanShoppingCart() {
    //localStorage.removeItem('infoCart');
    sessionStorage.removeItem('infoCart');
    console.log( JSON.parse(sessionStorage.getItem('infoCart') || '{}' ) );

    sessionStorage.removeItem('totalCartModal');

    sessionStorage.removeItem('totalDiscountCartModal');

    sessionStorage.removeItem('totalWithDiscountCartModal');
  }

}
