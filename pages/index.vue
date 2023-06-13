<template>
    <form class="center-auth" @submit="handleSignUp">
        <img class="center-auth-image" src="../assets/images/ReFrsh-Logo.png" alt="ReFrsh Logo">
        <h1 class="center-auth-item">Welcome to ReFresh!</h1>
        <p class="center-auth-item">ReFresh is a Web Chat App which allows you to chat anonymously with anyone through
            us :)
        </p>
        <button class="center-auth-button" type="submit">Register Anon</button>
    </form>
</template>

<script setup lang="ts">
import { useMainStore } from '@/store/index.js'

const handleSignUp = async (e: Event) => {
    const store = useMainStore()
    const router = useRouter()
    console.log(store.session);

    if (store.session) {
        console.log("Already logged in")
    }
    console.log(e.type);

    e.preventDefault()
    const loggedIn = await store.signup()
    if (loggedIn) {
        console.log("Logged in")
        router.push('/session')
    } else {
        console.error("Not logged in")
    }

    console.log(store.session);
}

onMounted(async () => {
    const store = useMainStore()
    const router = useRouter()
    const loggedIn = await store.getSession
    // push the user to session page
    if (loggedIn) {
        router.push('/session')
    }
})
</script>