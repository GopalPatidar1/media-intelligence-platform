<template>
    <header class="header">
        <div class="left">
            <h2>Welcome to App 👋</h2>
            <p class="user">Hello, {{ firstName }}</p>
        </div>

        <div class="right">
            <button type="button" class="btn" @click="fileUpload = true">Upload File
            </button>
        </div>

        <UploadModal v-if="fileUpload" @close="fileUpload = false" />
    </header>
</template>

<script setup lang="ts">
// const props = defineProps({
//     firstName: {
//         type: String,
//         default: "User"
//     }
// })

const fileUpload = ref<boolean>(false)

</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 20px;
    background: #1e293b;
    color: white;
    border-radius: 10px;
}

.left h2 {
    margin: 0;
    font-size: 18px;
}

.user {
    font-size: 14px;
    opacity: 0.8;
    margin-top: 4px;
}

.right {
    display: flex;
    gap: 10px;
    align-items: center;
}

.input {
    padding: 8px 10px;
    border-radius: 6px;
    border: none;
    outline: none;
}

.btn {
    background: #3b82f6;
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    border: none;
}

.btn:hover {
    background: #2563eb;
}
</style>