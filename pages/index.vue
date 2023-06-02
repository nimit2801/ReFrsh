<template>
    <h1>{{ id }}</h1>
    <form class="center-auth" @submit="handleSignUp">
        <img class="center-auth-image" src="../assets/images/ReFrsh-Logo.png" alt="ReFrsh Logo">
        <h1 class="center-auth-item">Welcome to ReFresh!</h1>
        <p class="center-auth-item">ReFresh is a Web Chat App which allows you to chat anonymously with anyone through
            us :)
        </p>
        <button class="center-auth-button" type="submit">Register Anon</button>
    </form>
</template>

<script lang="ts">
import { useMainStore } from '@/store/index.js'

export default {
    data() {
        const store = useMainStore()
        let session = store.session
        let id: string;
        if (session == null) {
            console.log("Account is null");
            id = "null"
        }
        else {
            console.log(session);
            id = session.userId
        }
        return {
            id
        }
    },
    methods: {
        async handleSignUp(e: Event) {
            const store = useMainStore()
            console.log(store.session);

            if (store.session) {
                console.log("Already logged in")
                return
            }
            console.log(e.type);

            e.preventDefault()
            await store.signup()
            console.log(store.session);
        }
    },
    async mounted() {
        const store = useMainStore()
        const loggedIn = await store.getSession()
        this.id = store.session?.userId!!
        // push the user to session page
        if (loggedIn) {
            this.$router.push('/session')
        }
    }
}
</script>