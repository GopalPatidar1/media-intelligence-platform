<template>
    <AppHeader :firstName="'Gopal'" />
    <div class="container">
        <h3>Asset Overview Dashboard</h3>

        <p v-if="!files.length && !loading">
            No assets available yet. Upload files to see them here.
        </p>
        <table class="table" v-if="files.length">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Total Assets</th>
                    <th>Size (KB)</th>
                    <th>Uploaded Date</th>
                    <th>Action Button</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="file in files" :key="file.name">
                    <td>{{ capitalizeWords(file.fileType) }}</td>
                    <td>{{ file.count }}</td>
                    <td>{{ formatSize(file.size) }}</td>
                    <td>{{ formatDate(file.createdAt) }}</td>
                    <td>
                        <NuxtLink :to="`/files/${file.fileType}`" class=" viewBtn">View Folder</NuxtLink>
                    </td>
                </tr>
            </tbody>
        </table>

        <p v-if="loading">Loading assets...</p>
        <p v-if="error" class="error">{{ error }}</p>
    </div>
</template>

<script setup>
import { useApi } from '~/composables/useApi'
const { request, loading, error } = useApi()
const files = ref([])
const fetchFiles = async () => {
    try {
        const res = await request("/api/file/get")
        files.value = res.data
    } catch (err) {
        console.error(err)
    }
}

onMounted(() => {
    fetchFiles()
})
</script>

<style scoped>
.container {
    padding: 20px;
}

.table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.table th,
.table td {
    border: 1px solid #ddd;
    padding: 8px;
}

.table th {
    background: #1e293b;
    color: white;
}

.error {
    color: red;
    margin-top: 10px;
}

.viewBtn {
    padding: 4px;
    color: #105ef0;
    text-decoration: underline;
    border: none;
    background-color: transparent;
    cursor: pointer;
}
</style>