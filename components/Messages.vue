<template>
    <div class="messages">
        <li>{{ message.messageSenderId }}: {{ message.message }}</li>
    </div>
</template>

<script lang="ts">
export default {
    name: 'Messages',
    props: ['message'],
}
</script>

<style></style>