// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  modules: ['@pinia/nuxt', 'nuxt-appwrite'],
  appwrite: {
    endpoint: 'https://cloud.appwrite.io/v1',
    project: '647986a45b07d841d978',
  },
});
