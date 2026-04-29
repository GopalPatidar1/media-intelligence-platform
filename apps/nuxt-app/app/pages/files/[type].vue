<template>
    <AppHeader :firstName="'Gopal'" />
    <div class="container">
        <div class="header-container">
            <button @click="() => router.back()"> Back to Dashboard </button>
            <h3>{{ capitalizeWords(type) }} Asset Overview</h3>
        </div>

        <input class="search-box" v-model="searchText" placeholder="Search Asset Overview ">

        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Size (KB)</th>
                    <th>Uploaded Date</th>
                    <th>Status</th>
                    <th>Action Button</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="file in files" :key="file.fileName">
                    <!-- <div v-if="type && type.startsWith('image')">
                        <img :src="file.fileUrl" alt="preview" style="width: 50px; height: 50px; object-fit: cover;" />
                        <div>{{ capitalizeWords(file.fileName) }}</div>
                    </div>
                    <div v-else>
                        {{ capitalizeWords(file.fileName) }}
                    </div> -->

                    <td>{{ capitalizeWords(file.fileName) }}</td>
                    <td>{{ formatSize(file.size) }}</td>
                    <td>{{ formatDate(file.createdAt) }}</td>
                    <td>{{ capitalizeWords(file.status) }}</td>
                    <td>
                        <button class="view-btn" @click="() => deleteFile(file.uid)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <p v-if="fileStore.loading">{{ searchText ? "Searching assets..." : "Loading assets..." }}</p>
        <p v-if="fileStore.error" class="error">{{ fileStore.error }}</p>
    </div>
</template>

<script setup lang="ts">
import { useConfirm } from "@/composables/useConfirm"
import { useMessage } from "@/composables/useMessage"
import { useFileTypeStore } from '@/stores/fileTypeStore'
const fileStore = useFileTypeStore()
export type FileType = 'image' | 'video' | 'document' | 'audio';
const { confirm } = useConfirm()
const { showMessage } = useMessage()
const router = useRouter()
const route = useRoute();
const type = computed(() => route.params.type as FileType)
const searchText = ref<string>("")

const deleteFile = async (uid: string) => {
    const confirmed = await confirm({ message: "Are you sure you want to delete this file?" });
    if (!confirmed) return;
    await fileStore.deleteFile(type.value, uid)
    showMessage("File deleted successfully");

}

const files = computed(() =>
    fileStore.getFilesByType(type.value)
)

let timeout: any

watch(searchText, () => {
    clearTimeout(timeout)
    timeout = setTimeout(async () => {
        fileStore.fetchFiles(type.value, searchText.value, true)
    }, 400)
})

onMounted(() => {
    fileStore.fetchFiles(type.value)
})
</script>

<style scoped>
.container {
    padding: 20px;
}

.header-container {
    display: flex;
    flex-direction: row;
    gap: 5px;
}

.header-container button {
    border: none;
    background-color: transparent;
    color: #105ef0;
    font-size: large;
    cursor: pointer;
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

.view-btn {
    padding: 4px;
    color: #105ef0;
    text-decoration: underline;
    border: none;
    background-color: transparent;
    cursor: pointer;
}

.search-box {
    padding: 5px;
    border-color: #ddd;
    border-radius: 5px;
    border-width: 1px;
    width: 250px;
}
</style>