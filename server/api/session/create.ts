import { Client, Databases } from 'node-appwrite';

type createResponse = {
  success: boolean;
  message: string;
};

export default defineEventHandler(async (event): Promise<createResponse> => {
  const client = new Client();
  const runtimeConfig = useRuntimeConfig();
  client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('647986a45b07d841d978')
    .setKey(runtimeConfig.apiSecret)
    .setSelfSigned(true);

  const database = new Databases(client);
  const listDoc = await database.listDocuments(
    '6479a05b96a60acff24e',
    '6479c7ee0c7c5e254032'
  );

  console.log(listDoc);

  return {
    success: true,
    message: 'Hello World',
  };
});
