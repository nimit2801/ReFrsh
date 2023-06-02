<template>
    <div>
        <h1>Welcome To Session Dashboard</h1>
        <h3>Hello! {{ store.session?.userId }}</h3>
        <!-- <div class="session-dashboard">
            <button @click="addSession" class="create-session">Create Session</button>
            <div class="session-list">
            </div>
        </div> -->

        <div class="session-dashboard">
            <button @click="addSession" class="create-session">Create Session</button>
            <SessionLinks v-for="(doc, i) in store.chatSessions?.documents" :key="i" :doc="doc" />
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
                await this.store.getChatSession()
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

            // this.store = store
        }
    }
}


</script>

<style></style>