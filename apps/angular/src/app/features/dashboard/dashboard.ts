import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class DashboardComponent implements OnInit {
  files: any[] = [];
  loading = false;
  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchFiles();
  }

  async fetchFiles() {
    try {
      this.loading = true;

      const response: any = await this.http
        .get('http://localhost:3002/api/file/get', {
          withCredentials: true,
        })
        .toPromise();
      this.files = [...(response || [])];

      // this.files = [...response] || [];
    } catch {
      this.error = 'Failed to load assets';
    } finally {
      this.loading = false;
    }
  }

  capitalizeWords(text: string): string {
    if (!text) return '';

    return text.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  formatSize(size: number): string {
    return (size / 1024).toFixed(2);
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }
}
