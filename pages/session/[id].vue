<template>
    <div>
        <h1>Welcome To Session {{ $route.params.id }}</h1>
        <button @click="copyClipBoard" :class="`${copied ? 'share-button-clicked' : 'share-button'}`">
            <Icon :name="`${copied ? 'icon-park-solid:correct' : 'material-symbols:share'}`" />
            Share Link
        </button>
        <Messages v-for="(message, i) in store.chat?.documents" :message="message" :key="i" />

        <form @submit.prevent="appwriteSender(text)" class="sender-box">
            <input type="text" class="classy-input-message" v-model="text" />
            <button class="classy-button">Send</button>
        </form>
        <form @submit.prevent="addAccess" v-if="needAccess">
            <br />
            <input type="password" class="classy-input" placeholder="password" v-model="password" />
            <button>Submit</button>
        </form>
    </div>
</template>

<script lang="ts">
import { useMainStore } from '@/store/index.js'
import { Client, ID } from 'appwrite'
export default {
    data() {
        const store = useMainStore()
        return {
            store, text: "", copied: false, needAccess: false, password: ""
        }
    },
    methods: {
        print(text: string) {
            console.log(text);
        },
        copyClipBoard() {
            const url = window.location.href
            navigator.clipboard.writeText(url)
            this.copied = true
            setTimeout(() => {
                this.copied = false
            }, 1500);
        },
        async loadChats() {
            await this.store.getChatMessages(String(this.$route.params.id))
            const client_ = new Client();
            client_
                .setProject('647986a45b07d841d978')
                .setEndpoint('https://cloud.appwrite.io/v1');
            client_.subscribe(
                'databases.6479a05b96a60acff24e.collections.6479a09905d005cea479.documents',
                (event: any) => {
                    if (event.events.includes('databases.6479a05b96a60acff24e.collections.6479a09905d005cea479.documents.*.create')) {
                        console.log('Event Emitted: ', event.payload);
                        this.store.chat?.documents.push(event.payload)
                    }

                }
            );

        },
        async addAccess() {
            const { data } = await useFetch('/api/session/addAccess', {
                method: 'POST',
                body: {
                    sessionId: this.$route.params.id,
                    password: this.password,
                    userId: this.store.session?.userId
                }
            });

            if(data) {
                console.log('data for addAccess: ', data);
                this.needAccess = false
                await this.loadChats();
            }

            // data.value?.success ? this.needAccess = false : alert("Wrong Password")
        },
        async appwriteSender(text: string) {
            const { database } = useAppwrite()
            const databaseId = '6479a05b96a60acff24e';
            const userChatCollectionId = '6479a09905d005cea479';
            const store = useMainStore()
            const loggedIn = await store.getSession
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
        console.log("Created")
        const store = useMainStore()

        // console.log("This Chat Session: ", store.);
        const loggedIn = await store.getSession
        if (!loggedIn) {
            console.log("Not logged in");
            alert('You are not logged in, please press ok to login and we\'ll create an anonymous account for you');
            // new login here
            // TODO: Make a useLogin hook
            const loggedIn = await store.signup()
            this.needAccess = true
            console.log("Logged In: ", loggedIn);

        } else {
            console.log("Logged In");
            // Get details about this session
            // const chatSessionDetails = await 
            const access = await store.checkAccessToChatSession(String(this.$route.params.id))

            if (!access) {
                console.log("No Access || Session Does Not Exists");
                // TODO: does the page really exists
                const { data } = await useFetch(`/api/session/exists?sessionId=${this.$route.params.id}`)
                console.log("Data: ", data.value?.success);
                if (data.value?.success) {
                    console.log("Session Exists");
                    this.needAccess = true
                    // add my access
                } else {
                    console.log("Session Does Not Exists");
                }
                // const {data} = useFetch('/api/session/addAccess')
                // this.$router.push({ name: 'session' })
            } else {
                console.log("Access");
                await store.getChatMessages(String(this.$route.params.id))
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
    }
}


</script>

<style></style>