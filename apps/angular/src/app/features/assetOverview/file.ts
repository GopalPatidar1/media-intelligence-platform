// asset-overview.component.ts

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfirmModalComponent } from '../../shared/confirm-modal/confirm-modal';

import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-asset-overview',
  standalone: true,
  imports: [CommonModule, FormsModule, ConfirmModalComponent],
  templateUrl: './file.html',
  styleUrls: ['./file.css'],
})
export class AssetOverviewComponent implements OnInit {
  files: any[] = [];
  loading = false;
  error = '';
  searchText = '';
  type = '';
  fileUpload: any = {};
  isModalOpen = false;

  modalTitle = '';
  modalMessage = '';

  private deleteUid = '';

  timeout: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.type = params['type'];
      this.fetchFiles();
    });
  }

  async fetchFiles(search = '') {
    try {
      this.loading = true;

      const response: any = await firstValueFrom(
        this.http.get(`http://localhost:3002/api/file/get?type=${this.type}&search=${search}`, {
          withCredentials: true,
        }),
      );
      this.files = [...(response || [])];

      this.loading = false;
    } catch {
      this.error = 'Failed to load assets';
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  onSearchChange() {
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.fetchFiles(this.searchText);
    }, 400);
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  updateFile(file?: any) {
    if (this.fileUpload?.uid) {
      this.fileUpload = {};
    } else if (file?.uid) {
      this.fileUpload = { ...file };
    }
  }

  onCancel = () => {
    this.isModalOpen = false;
  };

  openDeleteModal(uid: string) {
    this.deleteUid = uid;

    this.modalTitle = 'Delete File';
    this.modalMessage = 'Are you sure you want to delete this file?';

    this.isModalOpen = true;
  }

  onAccept = async () => {
    this.isModalOpen = false;

    try {
      await firstValueFrom(
        this.http.delete(`http://localhost:3002/api/file/${this.deleteUid}`, {
          withCredentials: true,
        }),
      );

      alert('File deleted successfully');

      this.fetchFiles(this.searchText);
    } catch {
      alert('Failed to delete file');
    }
  };

  viewFile(uid: string) {
    window.open(`http://localhost:3002/api/file/${uid}`, '_blank');
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
