<template>
    <div>
        <h1>Welcome To Session {{ $route.params.id }}</h1>
        <Messages v-for="(message, i) in store.chat?.documents" :message="message" :key="i" />
        <div class="sender-box">
            <input type="text" class="classy-input" v-model="text" />
            <button class="classy-button" @click="appwriteSender(text)">Send</button>
        </div>
        <!-- <button @click="changer">Listener</button>-->
        <h3>{{ red }}</h3>

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
import { Client, ID } from 'appwrite'
export default {
    data() {
        const store = useMainStore()
        return {
            store, text: "", red: false
        }
    },
    methods: {
        changer() {
            this.red = !this.red
            console.log("Red: ", this.red);
        },
        async appwriteSender(text: string) {
            const { database } = useAppwrite()
            const databaseId = '6479a05b96a60acff24e';
            const userChatCollectionId = '6479a09905d005cea479';
            const store = useMainStore()
            const loggedIn = await store.getSession()
            if (loggedIn) {
                console.log("Logged In");
                console.log("Message Sender Id: ", store.session?.userId);

                try {
                    const sendMessage = await database.createDocument(
                        databaseId,
                        userChatCollectionId,
                        ID.unique(),
                        {
                            message: text,
                            messageSenderId: this.store.session?.userId,
                            sessionId: this.$route.params.id
                        },
                    )
                    console.log("Message Sent: ", sendMessage);
                    this.text = ""
                } catch (error) {
                    console.log("Error: ", error);
                }
            } else {
                alert("You are not logged in")
            }
        },
    },
    async created() {
        console.log("Process: ", process.browser)
        console.log("Created")
        const store = useMainStore()
        await store.getChat()
        const client_ = new Client();
        client_
            .setProject('647986a45b07d841d978')
            .setEndpoint('https://cloud.appwrite.io/v1');
        client_.subscribe(
            'databases.6479a05b96a60acff24e.collections.6479a09905d005cea479.documents',
            (event: any) => {
                if (event.events.includes('databases.6479a05b96a60acff24e.collections.6479a09905d005cea479.documents.*.create')) {
                    console.log('Event Emitted: ', event.payload);
                    store.chat?.documents.push(event.payload)
                }

            }
        );
    }
}


</script>

<style></style>