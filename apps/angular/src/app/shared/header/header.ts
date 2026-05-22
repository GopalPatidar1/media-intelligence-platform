import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { UploadModalComponent } from '../upload/upload';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  imports: [CommonModule, UploadModalComponent],
})
export class HeaderComponent {
  @Input() firstName: string = 'User';

  fileUpload: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

  openUpload() {
    this.fileUpload = true;
  }

  async logoutUser() {
    try {
      await this.http
        .get('http://localhost:3002/api/auth/logout', {
          withCredentials: true,
        })
        .toPromise();
      this.router.navigate(['/login']);
    } catch (err) {
      console.error('Logout failed', err);
    }
  }
}
