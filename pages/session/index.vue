<template>
    <div>
        <h1>Welcome To Session Dashboard</h1>
        <h3>Hello! {{ store.session?.userId }}</h3>
        <div class="session-dashboard">
            <button @click="addSession" class="create-session">Create Session</button>
            <div class="session-list">
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { useMainStore } from '@/store/index.js'

export default {
    data() {
        const store = useMainStore()
        return {
            store
        }
    },
    methods: {
        async addSession() {
            console.log("Add Session");
            let selectParent = document.querySelector(".session-list")
            // let li = document.createElement("li")
            // li.setAttribute("class", "session-item")
            // li.textContent = "New Session"
            // selectParent?.appendChild(li)
            const truty = await this.store.createChatSession()
            if (truty) {
                console.log("Session Created");
            }
            else {
                console.log("Session Not Created");
            }
        }
    },
    async mounted() {

        const store = useMainStore()
        const loggedIn = await store.getSession()
        if (!loggedIn) {
            console.log("Not logged in");

            this.$router.push('/')
        } else {
            await store.getChatSession()
            console.log(store.session?.userId);
            console.log("Chat Sessions: ", store.chatSessions?.sessions);

            this.store = store
        }
    }
}


</script>

<style></style>