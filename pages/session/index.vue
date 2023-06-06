<template>
    <div>
        <h1>Welcome To Session Dashboard</h1>
        <h3>Hello! {{ store.session?.userId }}</h3>

        <div class="session-dashboard">
            <input placeholder="Session Name" type="text" class="classy-input" v-model="sessionName" />
            <input placeholder="Password" type="password" class="classy-input" v-model="password" />
            <button @click="addSession" class="create-session">Create Session</button>
            <pre v-if="!nameExists">The session name is not available</pre>
            <div class="docs-list">
                <SessionLinks v-for="(doc, i) in store.chatSessions?.documents" :key="i" :doc="doc" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { useMainStore } from '@/store/index.js'
import { ref } from 'vue'

export default {
    data() {
        const store = useMainStore()
        return {
            store, sessionName: "", password: "", nameExists: true
        }
    },
    methods: {
        async addSession() {
            console.log("Add Session");
            let selectParent = document.querySelector(".session-list")
            const sessionName = this.sessionName.trim()
            const password = this.password.trim()

            // Check name availability
            const checkNameAvailable = await this.store.checkNameAvailability(sessionName)
            if (checkNameAvailable) {
                console.log("is available");
                this.nameExists = true
                const truty = await this.store.createChatSession(sessionName, password)
                if (truty) {
                    console.log("Session Created");
                    await this.store.getChatSession()
                    this.sessionName = ""
                    this.password = ""
                }
                else {
                    console.log("Session Not Created");
                }
            } else {
                console.log("already taken");
                this.nameExists = false
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
            console.log("Store Chat Sessions: ", store.chatSessions);
            if (store.chatSessions?.documents.length !== 0) {
                let selectParent = document.querySelector(".session-list")
                store.chatSessions?.documents.forEach((session: any) => {
                    console.log("Running this li code");

                    let li = document.createElement("li")
                    li.setAttribute("class", "session-item")
                    li.textContent = session.$id
                    selectParent?.appendChild(li)
                });
            }
        }
    }
}


</script>

<style></style>