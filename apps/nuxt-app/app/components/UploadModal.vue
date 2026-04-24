<template>
    <div class="modal">
        <div class="modal-content">

            <!-- Header -->
            <div class="modal-header">
                <h2>Upload Asset</h2>
                <span class="close" @click="emit('close')">&times;</span>
            </div>

            <!-- Body -->
            <div class="modal-body">

                <!-- Upload Box -->
                <div class="upload-box" @click="triggerFile" @dragover.prevent @drop.prevent="handleDrop">
                    <input ref="fileInput" type="file" class="hidden-input" @change="handleFileChange" />

                    <div v-if="!file">
                        <p>Click or drag file to upload</p>
                        <small>Max file size: 5MB</small>
                    </div>

                    <!-- File Info -->
                    <div v-else class="file-info">
                        <span class="file-name">{{ file.name }}</span>
                        <span class="file-size">{{ formatSize(file.size) }}</span>
                    </div>
                </div>

                <!-- Name -->
                <input v-model="form.name" placeholder="Asset Name" />

                <!-- 
                <select v-model="form.type" disabled="true">
                    <option value="">Select Type</option>
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                    <option value="pdf">PDF</option>
                    <option value="doc">Document</option>
                </select> -->

                <!-- Department -->
                <input v-model="form.department" placeholder="Department" />

                <!-- Status -->
                <select v-model="form.status">
                    <option value="uploaded">Uploaded</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="approved">Approved</option>
                </select>

            </div>

            <!-- Footer -->
            <div class="modal-footer">
                <button class="btn cancel" @click="emit('close')">Cancel</button>
                <button class="btn submit" @click="submit">Upload</button>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { useApi } from '@/composables/useApi'
import type { FileForm } from '../types/file'

const { request } = useApi()
const emit = defineEmits(['close'])

const file = ref<File | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

const form = reactive<FileForm>({
    name: '',
    type: '',
    department: '',
    status: 'uploaded'
})

// Trigger file input
const triggerFile = () => {
    fileInput.value?.click()
}

// Handle file selection
const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    const selectedFile = target.files?.[0]
    validateFile(selectedFile)
}

// Handle drag & drop
const handleDrop = (e: any) => {
    const droppedFile = e.dataTransfer?.files?.[0]
    validateFile(droppedFile)
}

// Validate file
const validateFile = (selectedFile?: File) => {
    if (!selectedFile) return

    if (selectedFile.size > MAX_FILE_SIZE) {
        alert('File size must be less than 5MB')
        file.value = null
        return
    }

    file.value = selectedFile
}

// Format size
const formatSize = (size: number) => {
    return (size / 1024 / 1024).toFixed(2) + ' MB'
}

// Submit
const submit = async () => {
    if (!file.value) {
        alert('Please select a file')
        return
    }

    const formData = new FormData()
    formData.append('file', file.value)
    formData.append('name', form.name)
    formData.append('type', form.type)
    formData.append('status', form.status)
    formData.append('department', form.department)

    try {
        await request('/api/file/upload', {
            method: 'POST',
            body: formData
        })

        alert('File uploaded successfully!')
        emit('close')
    } catch (err) {
        console.error(err)
        alert('Upload failed')
    }
}
</script>

<style scoped>
.modal {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: white;
    color: black;
    width: 500px;
    border-radius: 8px;
    padding: 20px;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-body {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

/* Upload box */
.upload-box {
    border: 2px dashed #ccc;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    border-radius: 8px;
    transition: 0.2s;
}

.upload-box:hover {
    border-color: #007bff;
}

.hidden-input {
    display: none;
}

/* File info */
.file-info {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
}

.file-name {
    font-weight: 500;
}

.file-size {
    color: #666;
}

/* Inputs */
input,
select {
    padding: 10px;
    border-radius: 5px;
    font-size: 14px;
}

/* Footer */
.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}

.btn {
    padding: 8px 16px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
}

.cancel {
    background: #ccc;
}

.submit {
    background: #007bff;
    color: white;
}

.close {
    cursor: pointer;
    font-size: 22px;
}
</style>