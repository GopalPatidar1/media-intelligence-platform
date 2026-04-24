<template>
  <div>
    <!-- Main App -->
    <NuxtPage v-if="!hasError" />

    <!-- Global Error Modal -->
    <div v-if="hasError" class="error-modal">
      <div class="error-box">
        <h2>Something went wrong 😢</h2>
        <p>{{ errorMessage }}</p>
        <button @click="resetApp">Reload</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const hasError = ref(false)
const errorMessage = ref('')

onErrorCaptured((err) => {
  hasError.value = true
  errorMessage.value = err?.message || 'Unexpected error occurred'
  return false
})

const resetApp = () => {
  hasError.value = false
  errorMessage.value = ''
  window.location.reload()
}
</script>

<style>
body {
  background-color: #f6f7fa;
}

/* Modal styles */
.error-modal {
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

.error-box {
  background: white;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
}
</style>