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
    this.modalOpen = true;
    this.modalInformativeOpen = true;
    const title = '';
    const information = '';
    const nameButton = '';
    this.infoModal = new StructureModalWindow(title, information, nameButton, modalId, false);
  }

  action(action: 'pos' | 'neg') {
    if (action === 'neg') {
      this.modalOpen = false;
    }
  }

}
