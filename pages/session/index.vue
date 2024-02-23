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
            <pre v-if="noSessions">No Session Exists for the user!</pre>
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
            store, sessionName: "", password: "", nameExists: true, noSessions: false
        }
    },
    methods: {
        async addSession() {
            console.log("Add Session");
            let selectParent = document.querySelector(".session-list")
            const sessionName = this.sessionName.trim()
            const password = this.password.trim()

            // Check name availability
            // const checkNameAvailable = await this.store.checkNameAvailability(sessionName)
            const { data } = await useFetch(`/api/session/exists?sessionId=${sessionName}`)
            const checkNameAvailable = !data.value?.success;
            console.log(checkNameAvailable);

            if (checkNameAvailable) {
                console.log("is available");
                this.nameExists = true
                const truthy = await this.store.createChatSession(sessionName, password)
                if (truthy) {
                    console.log("Session Created");
                    await this.store.getChatSessions()
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
        const loggedIn = await store.getSession
        if (!loggedIn) {
            console.log("Not logged in");

            this.$router.push('/')
        } else {
            await store.getChatSessions()
            if (store.chatSessions?.documents.length !== undefined) {
                console.log("Store Chat Sessions: ", store.chatSessions);
                console.log("len: ", store.chatSessions?.documents.length);

                this.noSessions = false
            } else {
                console.log("No Sessions");
                this.noSessions = true
            }
        }
    }
}

</script>

<style></style>