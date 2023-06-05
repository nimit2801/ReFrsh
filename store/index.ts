import { set } from 'nuxt/dist/app/compat/capi';
import { defineStore } from 'pinia';
import { Models, Query, RealtimeResponseEvent, Client } from 'appwrite';
export const useMainStore = defineStore('main', {
  state: () => ({
    session: null as Models.Session | null,
    chatSessions: null as Models.DocumentList<Models.Document> | null,
    chat: null as Models.DocumentList<Models.Document> | null,
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
    async getChat() {
      const { client, database } = useAppwrite();
      // const client_ = new Client();
      // client_
      //   .setProject('647986a45b07d841d978')
      //   .setEndpoint('https://cloud.appwrite.io/v1');
      try {
        const listChatMessage = await database.listDocuments(
          '6479a05b96a60acff24e',
          '6479a09905d005cea479'
        );
        this.chat = listChatMessage;
        console.log('Chats: ', this.chat.documents);
      } catch (error) {
        console.log(error);
      }
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
        // console.log('User Sessions List', sessions.sesssionIds);
        const sessionCollectionId = '6479c7ee0c7c5e254032';
        sessions.sessionIds.forEach(async (sessionId: string) => {
          console.log('Session Id', sessionId);
        });
        const chatSessions = await database.listDocuments(
          databaseId,
          sessionCollectionId,
          [Query.equal('createdBy', [userId!!])]
        );
        console.log('Chat Sessions', chatSessions.documents);
        if (chatSessions.documents.length !== 0) {
          console.log('are you running this');

          this.chatSessions = chatSessions;
        } else {
          console.log('Nope');
        }

        // this.chatSessions = sessions;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
