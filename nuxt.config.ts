// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  modules: ['@pinia/nuxt', 'nuxt-appwrite', 'nuxt-icon'],
  appwrite: {
    endpoint: 'https://cloud.appwrite.io/v1',
    project: '647986a45b07d841d978',
  },
  routeRules: {
    '/session/**': { ssr: false },
  },
  runtimeConfig: {
    apiSecret: process.env.appwriteSecretKey,
    public: {
      projectId: process.env.appwriteProjectId,
      databaseId: process.env.appwriteDatabaseId,
      userChatCollectionId: process.env.appwriteUserChatCollectionId,
      chatCollectionId: process.env.appwriteChatCollectionId,
      sessionsCollectionId: process.env.appwriteSessionsCollectionId,
    },
  },
});
