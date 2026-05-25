import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ErrorModalComponent } from './shared/error-modal/error-modal';
import { GlobalErrorService } from './core/services/global-error';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ErrorModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  errorService = inject(GlobalErrorService);
}
