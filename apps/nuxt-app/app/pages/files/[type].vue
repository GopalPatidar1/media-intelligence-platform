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

        <p v-if="loading">{{ searchText ? "Searching assets..." : "Loading assets..." }}</p>
        <p v-if="error" class="error">{{ error }}</p>
    </div>
</template>

<script setup lang="ts">
import { useConfirm } from "@/composables/useConfirm"
import { useMessage } from "@/composables/useMessage"

const { confirm } = useConfirm()
const { showMessage } = useMessage()
const router = useRouter()
const route = useRoute();
const type = computed(() => route.params.type as string)

const { request } = useApi()
const files = ref<{
    firstName: string
    fileName: string
    size: number
    createdAt: string
    status: string
    uid: string
}[]>([])
const loading = ref<boolean>(false)
const error = ref<string>("")
const searchText = ref<string>("")


const deleteFile = async (uid: string) => {
    const confirmed = await confirm({ message: "Are you sure you want to delete this file?" });
    if (!confirmed) return;
    await request(`/api/file/${uid}`, { method: "DELETE", })
    showMessage("File deleted successfully");
    files.value = files.value.filter((item) => item.uid != uid)

}

const fetchFiles = async () => {
    loading.value = true
    error.value = ""
    try {
        const query = searchText.value ? { where: { fileName: searchText.value } } : {}
        const res = await request(`/api/file/get`, {
            params: {
                type: type.value,
                ...query
            }
        })
        files.value = res.data
    } catch (err) {
        error.value = "Failed to load files"
        console.error(err)
    } finally {
        loading.value = false
    }
}

let timeout: any

watch(searchText, () => {
    clearTimeout(timeout)
    timeout = setTimeout(async () => {
        fetchFiles()
    }, 400)
})

onMounted(() => {
    fetchFiles()
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