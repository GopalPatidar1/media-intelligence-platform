import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-modal',
  standalone: true,
  templateUrl: './error-modal.html',
  styleUrls: ['./error-modal.css'],
})
export class ErrorModalComponent {
  @Input() message = 'Something went wrong. Please try again later.';

  @Input() visible = false;

  closeModal(): void {
    this.visible = false;
  }
}
