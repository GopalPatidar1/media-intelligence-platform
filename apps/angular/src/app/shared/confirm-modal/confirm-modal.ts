import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-modal.html',
  styleUrls: ['./confirm-modal.css'],
})
export class ConfirmModalComponent {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() message = '';

  @Input() accept!: () => void;
  @Input() cancel!: () => void;
}
