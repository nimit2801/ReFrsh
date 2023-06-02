import { set } from 'nuxt/dist/app/compat/capi';
import { defineStore } from 'pinia';
import { Models, Query, RealtimeResponseEvent } from 'appwrite';
export const useMainStore = defineStore('main', {
  state: () => ({
    session: null as Models.Session | null,
    chatSessions: null as Models.Document | null,
    chat: null as [RealtimeResponseEvent<unknown>] | null,
  }),
  actions: {
    async signup() {
      console.log('SIGN_UP');
      try {
        const { account } = useAppwrite();
        const guest = await account.createAnonymousSession();
        this.session = guest;
        console.log(guest);
      } catch (error) {
        console.log(error);
      }
    },
    async getAccount() {
      const { account } = useAppwrite();
      const accountInfo = await account.get();
    },
    async getSession(): Promise<Boolean> {
      const { account } = useAppwrite();
      if (this.session !== null) {
        console.log('SESSION ALREADY SET');
        // push the user to session page
        return true;
      }
      if (account.getSession('current') === null) {
        console.log('NO SESSION');
        this.session = null;
        return false;
      } else {
        console.log('SESSION');
        this.session = await account.getSession('current');
        console.log(this.session);
        return true;
      }
    },
    getChat() {
      const { client } = useAppwrite();
      client.subscribe(
        'databases.6479a05b96a60acff24e.collections.6479a09905d005cea479.documents.6479a4173a3b5e072064',
        (event) => {
          console.log(event);
          this.chat?.push(event);
        }
      );
    },
    async createChatSession(): Promise<Boolean> {
      const userId = this.session?.userId;
      const databaseId = '6479a05b96a60acff24e';
      const collectionId = '6479c7ee0c7c5e254032';
      const { database, ID } = useAppwrite();
      try {
        const chatSession = await database.createDocument(
          databaseId,
          collectionId,
          ID.unique(),
          {
            createdBy: userId,
          }
        );
        console.log(chatSession);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async getChatSession(): Promise<void> {
      const { database, ID } = useAppwrite();
      const userId = this.session?.userId;
      const databaseId = '6479a05b96a60acff24e';
      const collectionId = '6479a070bbdfdddab0fd';
      try {
        const sessions = await database.getDocument(
          databaseId,
          collectionId,
          userId!!
        );
        console.log(sessions);
        this.chatSessions = sessions;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
