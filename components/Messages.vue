<template>
    <div class="messages">
        <li>{{ sender }}: {{ message.message }}</li>
    </div>
</template>

<script lang="ts">
import { useMainStore } from '@/store/index.js'
export default {
    name: 'Messages',
    props: ['message'],
    data() {
        const store = useMainStore()
        const sender = store.session?.userId == this.message.messageSenderId ? 'me' : 'you'
        return {
            sender
        }
    },
}
</script>

<style></style>