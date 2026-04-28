<!-- components/ConfirmModal.vue -->
<template>
    <div v-if="isOpen" class="modal-overlay">
        <div class="modal-box">

            <h3 class="title">{{ title }}</h3>
            <p class="message">{{ message }}</p>

            <div class="actions">
                <button class="cancel" @click="cancel">Cancel</button>
                <button class="confirm" @click="accept">Confirm</button>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { useConfirm } from "@/composables/useConfirm"
const { isOpen, title, message, accept, cancel } = useConfirm()
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);

    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-box {
    width: 320px;
    background: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
}

.title {
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: 600;
}

.message {
    margin-bottom: 20px;
    color: #555;
}

.actions {
    display: flex;
    justify-content: space-between;
}

.actions button {
    color: white;
    padding: 8px 14px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.cancel {
    background: #ccc;
}

.confirm {
    background: #dc3545;

}
</style>