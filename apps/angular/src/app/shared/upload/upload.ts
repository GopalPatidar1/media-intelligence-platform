import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'file-upload-modal',
  templateUrl: './upload.html',
  styleUrls: ['./upload.css'],
})
export class UploadModalComponent {
  @Input() data: any;
  @Output() close = new EventEmitter<void>();

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  file: File | null = null;

  MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  form = {
    name: '',
    type: '',
    department: '',
    status: 'uploaded',
  };

  constructor(private api: HttpClient) {}

  // close modal
  closeModal() {
    this.close.emit();
  }

  // trigger file input
  triggerFile() {
    this.fileInput?.nativeElement.click();
  }

  // file change
  handleFileChange(event: any) {
    const selectedFile = event.target.files?.[0];
    this.validateFile(selectedFile);
  }

  // drag over
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  // drop file
  handleDrop(event: DragEvent) {
    event.preventDefault();
    const droppedFile = event.dataTransfer?.files?.[0];
    this.validateFile(droppedFile);
  }

  // validate file
  validateFile(file?: File) {
    if (!file) return;

    if (file.size > this.MAX_FILE_SIZE) {
      alert('File size must be less than 5MB');
      this.file = null;
      return;
    }

    this.file = file;
  }

  // format size
  formatSize(size: number) {
    return (size / 1024 / 1024).toFixed(2) + ' MB';
  }

  // submit
  async submit() {
    if (!this.file) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('name', this.form.name);
    formData.append('type', this.form.type);
    formData.append('status', this.form.status);
    formData.append('department', this.form.department);

    try {
      if (this.data?.uid) {
        await this.api.post(`/api/file/${this.data.uid}`, formData);
      } else {
        await this.api.post('/api/file/upload', formData);
      }

      this.closeModal();
    } catch (err) {
      console.error(err);
    }
  }
}
