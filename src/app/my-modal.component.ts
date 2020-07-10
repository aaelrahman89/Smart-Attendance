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
    width: 30%;
    z-index: 1050;
    background-color: #ffffff;
    display: unset;
    height: 170px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 8px;
}
.modal-backdrop {
    z-index: 0;
}
.modal-header .close {
    margin-right: 1px;
    position: relative;
    top: 10px;
    z-index: 9999;
    color: #5f5a5a !important;
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
