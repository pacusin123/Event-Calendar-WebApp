import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-message',
  templateUrl: './modal-message.component.html'
})
export class ModalMessageComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}

}
