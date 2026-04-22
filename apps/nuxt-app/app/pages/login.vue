<template>
    <div class="login-container">
        <form @submit.prevent="handleLogin">
            <div class="heading">
                <h2>Login</h2>
                <h3>Enter your details to login.</h3>
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
                {{ loading ? "Logging in..." : "Login" }}
            </button>

            <p v-if="error" class="error">{{ error }}</p>
        </form>
    </div>
</template>

<script setup lang="ts">

const { request, loading, error } = useApi()
const email = ref<string>("")
const password = ref<string>("")

const handleLogin = async () => {
    const { data } = await request("/api/auth/login", {
        method: "POST",
        body: {
            email: email.value,
            password: password.value,
        },
    });
    // await navigateTo("/dashboard");
};

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
    margin-top: 10px;
}
</style>