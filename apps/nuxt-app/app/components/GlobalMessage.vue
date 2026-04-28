<template>
    <div v-if="message" :class="['toast', type]">
        {{ message }}
    </div>
</template>

<script setup>
import { useMessage } from "@/composables/useMessage"
const { message, type } = useMessage()
</script>

<style scoped>
.toast {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);

    min-width: 25%;
    padding: 12px 20px;
    border-radius: 6px;
    color: white;
    font-weight: 500;
    z-index: 9999;
}

.success {
    background-color: #28a745;
}

.error {
    background-color: #dc3545;
}
</style>