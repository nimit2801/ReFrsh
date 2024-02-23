import { defineStore } from 'pinia';
import {
  Models,
  Query,
  Client,
  AppwriteException,
} from 'appwrite';
export const useMainStore = defineStore('main', {
  state: () => ({
    session: null as Models.Session | null,
    chatSessions: null as Models.DocumentList<Models.Document> | null,
    chat: null as Models.DocumentList<Models.Document> | null,
    // TODO: Edge case if multiple clients open
    client: Client,
  }),
  getters: {
    async getAccount() {
      const { account } = useAppwrite();
      const accountInfo = await account.get();
      return accountInfo;
    },
    async getSession(): Promise<Boolean> {
      const { account } = useAppwrite();
      console.log('are we in get session?');
      try {
        if (this.session !== null) {
          console.log('SESSION ALREADY SET');
          // push the user to session page
          return true;
        }
        const currentAccount = await account.getSession('current');
        if (currentAccount === null) {
          console.log('NO SESSION');
          this.session = null;
          return false;
        } else if (currentAccount !== null) {
          console.log('SESSION');
          console.log('Account Session: ', currentAccount);
          this.session = currentAccount;
          console.log(this.session);
          return true;
        } else {
          console.log('Account Session: ', currentAccount);
        }
      } catch (error) {
        console.log(error);
        return false;
      }
      return false;
    },
  },
  actions: {
    async signup(): Promise<Boolean> {
      console.log('SIGN_UP');
      try {
        const { account } = useAppwrite();
        const guest = await account.createAnonymousSession();
        this.session = guest;
        console.log(guest);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async getChatMessages(sessionId: string) {
      const { client, database } = useAppwrite();
      // const client_ = new Client();
      // client_
      //   .setProject('647986a45b07d841d978')
      //   .setEndpoint('https://cloud.appwrite.io/v1');
      try {
        const listChatMessage = await database.listDocuments(
          '6479a05b96a60acff24e',
          '6479a09905d005cea479',
          [Query.equal('sessionId', sessionId)]
        );
        this.chat = listChatMessage;
        console.log('Chats: ', this.chat.documents);
      } catch (error) {
        console.log(error);
      }
    },
    async createChatSession(
      sessionName: string,
      password: string
    ): Promise<Boolean> {
      const userId = this.session?.userId;
      const databaseId = '6479a05b96a60acff24e';
      const collectionId = '6479c7ee0c7c5e254032';
      const { database, ID } = useAppwrite();
      try {
        const chatSession = await database.createDocument(
          databaseId,
          collectionId,
          sessionName,
          {
            createdBy: userId,
            password,
          }
        );
        console.log(chatSession);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },

    async getChatSessions(): Promise<void> {
      const { database, ID } = useAppwrite();
      const userId = this.session?.userId;
      const databaseId = '6479a05b96a60acff24e';

      try {
        const sessionCollectionId = '6479c7ee0c7c5e254032';
        const chatSessions = await database.listDocuments(
          databaseId,
          sessionCollectionId,
          [Query.equal('createdBy', [userId!!])]
        );
        console.log('Chat Sessions', chatSessions.documents);
        if (chatSessions.documents.length !== 0) {
          this.chatSessions = chatSessions;
        } else {
          console.log('Nope');
        }
      } catch (error: AppwriteException | any) {
        if (error.type === 'document_not_found') {
          console.log('No sessions found');
        } else {
          console.log(error);
        }
      }
    },
    async checkAccessToChatSession(sessionId: string): Promise<Boolean> {
      const { database } = useAppwrite();
      try {
        const chatSessionDetails = await database.getDocument(
          '6479a05b96a60acff24e',
          '6479c7ee0c7c5e254032',
          sessionId
        );
        console.log('Chat Session Details', chatSessionDetails);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});
