import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorService {
  visible = signal(false);

  message = signal('Something went wrong. Please try again later.');

  show(message?: string): void {
    queueMicrotask(() => {
      this.message.set(message || 'Something went wrong. Please try again later.');

      this.visible.set(true);
    });
  }

  hide(): void {
    this.visible.set(false);
  }
}
