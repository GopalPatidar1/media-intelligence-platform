<script setup lang="ts">
import type { FileForm } from '../types/file'
const { request } = useApi()
const emit = defineEmits(['close'])

const file = ref<File | null>(null)

const form = reactive<FileForm>({
    name: '',
    type: '',
    department: '',
    status: 'uploaded'
})

const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    file.value = target.files?.[0] || null
}

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
        emit('close') // optional: close modal after success
    } catch (err) {
        console.error(err)
        alert('Upload failed')
    }
}
</script>

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

                <!-- File -->
                <input type="file" @change="handleFileChange" />

                <!-- Name -->
                <input v-model="form.name" placeholder="Asset Name" />

                <!-- Type -->
                <select v-model="form.type">
                    <option value="">Select Type</option>
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                    <option value="pdf">PDF</option>
                    <option value="doc">Document</option>
                </select>

                <input v-model="form.department" placeholder="Department" />


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

<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);

    display: flex;
    justify-content: center;
    align-items: center;
}

input,
select {
    padding: 10px;
    border-radius: 5px;
    font-size: large;
}

.modal-content {
    background: white;
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
    gap: 10px;
    margin-top: 15px;
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
}

.close {
    cursor: pointer;
    font-size: 22px;
}

.btn {
    padding: 8px 16px;
    border: none;
    cursor: pointer;
}

.cancel {
    background: #ccc;
}

.submit {
    background: #007bff;
    color: white;
}
</style>