import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private isModalOpen = new BehaviorSubject<boolean>(false);  // Estado del modal
  modalStatus$ = this.isModalOpen.asObservable();  // Observable para suscribirse

  constructor() {}

  openModal() {
    this.isModalOpen.next(true);  // Cambia el estado del modal a abierto
  }

  closeModal() {
    this.isModalOpen.next(false);  // Cambia el estado del modal a cerrado
  }
}
