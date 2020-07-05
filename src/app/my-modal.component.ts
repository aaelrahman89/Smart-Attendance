import { Component } from '@angular/core';

import { Modal } from './modal-service/models/modal.model';

@Component({
  template: `
    <div class="modal">
      <div class="modal-header border-0 p-0">
        <button type="button" class="close" (click)="cancel()"><i class="far fa-times-circle"></i></button>
      </div>
      <div class="modal-body">
        <h3 class="text-center">
        <i class="fas far mb-3 fa-4x" [ngClass]='icon'></i>
        <b>{{ message }}</b>
      </h3>
      </div>
    </div>
  `,
  styles: [`
  .modal {
    position: fixed;
    top: 20px;
    left: 20px;
    right: 20px;
    width: 30%;
    margin: 0;
    z-index: 1050;
    background-color: #ffffff;
    display: unset;
    height: auto;
    margin: auto;
}
.modal-backdrop {
    z-index: 0;
}
.modal-header .close {
    margin-right: 1px;
    position: relative;
    top: 10px;
    z-index: 9999;
}
b{
    display: block;
    font-size: 20px;
    color: #1d1c39;
}
  `]
})
export class MyModalComponent extends Modal {

  icon: string;
  message: string;

  onInjectInputs(inputs): void {
    this.icon = inputs.icon;
    this.message = inputs.message;
  }

  save(): void {
    this.close('saving');
  }

  cancel(): void {
    this.dismiss('canceling');
  }

}
