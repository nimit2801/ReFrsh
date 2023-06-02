<template>
    <div class="docs">
        <li>
            <NuxtLink :to="`/session/${doc.$id}`">{{ doc.$id }}</NuxtLink>
        </li>
    </div>
</template>

<script>
export default {
    name: 'SessionLinks',
    props: ['doc'],
}
</script>

<style></style>