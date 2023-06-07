import { Client, Databases } from 'node-appwrite';

type createResponse = {
  success: boolean;
  message: string;
};

export default defineEventHandler(async (event): Promise<createResponse> => {
  const runtimeConfig = useRuntimeConfig();
  // const body = reqBody(event);
  const query = getQuery(event);
  // const query = useQuery(event);
  const client = new Client();
  client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('647986a45b07d841d978')
    .setKey(runtimeConfig.apiSecret)
    .setSelfSigned(true);

  const database = new Databases(client);
  const getDoc = await database.getDocument(
    runtimeConfig.public.databaseId,
    runtimeConfig.public.sessionsCollectionId,
    String(query.sessionId)
  );
  if (getDoc.$id) {
    console.log(getDoc);
    return {
      success: true,
      message: 'Hello World',
    };
  } else {
    return {
      success: false,
      message: 'Session does not exist',
    };
  }
});
