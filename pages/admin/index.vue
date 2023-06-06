<template>
    <div>
        <h1> Welcome to admin! </h1>
        <pre>resp from appwrite flust {{ resp.message }}</pre>
        <div class="flex-class">
            <button class="tile-button" @click="ping">Ping</button>
            <button class="tile-button" @click="flushUserChatCollection">Flush User Chat Collection</button>
            <button class="tile-button" @click="appwriteConnect">Appwrite Connect</button>
            <button class="tile-button" @click="random()">Random</button>
        </div>
    </div>
</template>

<script lang="ts">
import { toHandlers } from 'nuxt/dist/app/compat/capi'
import { ref } from 'vue'
import type { Ref } from 'vue'
import ping from '~/server/api/ping';

export default {
    setup() {
        let resp = ref("asd");
        const random = () => {
            const { data } = useFetch('/api/session/create')
            resp = ref(data);
        }
        return {
            resp, random
        }
    },
    data() {

        let data: Ref<{ hello: string; } | null> = ref({ hello: "random" })
        return {
            data: data,
            resp: ""
        }
    },
    methods: {
        async flushUserChatCollection() {
            const { data } = await useFetch('/api/chats/delete')
            this.resp = ref(data);
            console.log("Flushed User Chat Collection");

        },
        async appwriteConnect() {
            const { data } = await useFetch('/api/session/create')
            console.log(data);
        },
        async ping() {
            const { data } = await useFetch('/api/ping')
            console.log(data);
        }
    },
    async mounted() {
        console.log("Admin Page Mounted");
        const { account, teams } = useAppwrite()

        const session = await account.getSession('current')
        const prefs = await account.getPrefs()
        console.log("Prefs: ", prefs);
        console.log("Session: ", session);
        if (account.getSession('current') !== null) {
            if (prefs.admin == "true") {
                console.log("Admin");
                console.log("Logged In");
            }
            else {
                console.log("Not Admin");
                this.$router.push('/admin/login')
            }
        }
        else {
            console.log("Not Logged In");
            // push the user to admin-login
            this.$router.push('/admin/login')
        }
    }
}
</script>

<style></style>