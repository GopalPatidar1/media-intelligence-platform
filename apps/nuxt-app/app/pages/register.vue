<template>
    <div class="login-container">
        <form @submit.prevent="handleRegister">
            <div class="heading">
                <h2>Register</h2>
                <h3>Create your account.</h3>
                <p v-if="error" class="error">{{ error }}</p>
            </div>

            <div class="form-group">
                <label for="name">Name</label>
                <input id="name" v-model="name" type="text" placeholder="Enter your name" required />
            </div>

            <div class="form-group">
                <label for="email">Email</label>
                <input id="email" v-model="email" type="email" placeholder="Enter your email" required />
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input id="password" v-model="password" type="password" placeholder="Enter your password" required />
            </div>

            <button type="submit" :disabled="loading">
                {{ loading ? "Registering..." : "Register" }}
            </button>

            <p class="redirect">
                Already have an account?
                <NuxtLink to="/login">Login</NuxtLink>
            </p>
        </form>
    </div>
</template>

<script setup lang="ts">
import { useApi } from '~/composables/useApi'

const { request, loading, error } = useApi()

const name = ref<string>("")
const email = ref<string>("")
const password = ref<string>("")

const handleRegister = async () => {
    await request("/api/auth/register", {
        method: "POST",
        body: {
            name: name.value,
            email: email.value,
            password: password.value,
        },
    })

    await navigateTo("/login")
}
</script>

<style scoped>
.heading {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
}

.heading h2,
h3 {
    margin: 0;
}

.login-container {
    max-width: 400px;
    margin: 100px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: white;
}

.form-group {
    margin-bottom: 15px;
}

input {
    width: 100%;
    padding: 8px;
    border-radius: 5px;
    border-width: 1px;
    box-sizing: border-box;
}

button {
    width: 100%;
    padding: 10px;
    cursor: pointer;
    background-color: blue;
    color: white;
    border: none;
    border-radius: 5px;
}

.error {
    color: red;
    margin: 0;
}

.redirect {
    margin-top: 10px;
    text-align: center;
}
</style>