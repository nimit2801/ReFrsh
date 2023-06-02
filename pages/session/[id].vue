<template>
    <div>
        <h1>Welcome To Session {{ $route.params.id }}</h1>
        <!-- <h3>Hello! {{ store.session?.userId }}</h3>
        <div class="chat">
            <div v-for="(message, i) in store.chat" :key="i" :message="message">
                {message}
            </div>
        </div> -->
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
        listener() {
            console.log("Listener")
            const { client } = useAppwrite()
            client.setEndpoint('https://cloud.appwrite.io/v1').setProject('647986a45b07d841d978')
            console.log("Client: ", client)

            client.subscribe('databases.*.collections.*.documents.6479a4173a3b5e072064', (event) => {
                try {
                    console.log(event)
                } catch (error) {
                    console.log(error)
                }
            })
        }
    },
    created() {
        const store = useMainStore()
        store.getChat()
        console.log("Chat: ", store.chat);
    }
}


</script>

<style></style>