import { Client, Databases } from 'node-appwrite';

type createResponse = {
  success: boolean;
  message: string;
};

export default defineEventHandler(async (event): Promise<createResponse> => {
  const runtimeConfig = useRuntimeConfig();
  const client = new Client();
  client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('647986a45b07d841d978')
    .setKey(runtimeConfig.apiSecret)
    .setSelfSigned(true);

  const database = new Databases(client);
  const userChatCollectionId = '6479a09905d005cea479';
  const listDoc = await database.listDocuments(
    '6479a05b96a60acff24e',
    userChatCollectionId
  );

  if (listDoc.documents.length === 0) {
    console.log('No documents to delete');
    return {
      success: true,
      message: 'No documents to delete',
    };
  }

  listDoc.documents.forEach(async (doc) => {
    try {
      console.log('Deleting: ', doc.$id);
      await database.deleteDocument(
        '6479a05b96a60acff24e',
        userChatCollectionId,
        doc.$id
      );
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: 'Error deleting documents',
      };
    }
  });

  const updateListDoc = await database.listDocuments(
    '6479a05b96a60acff24e',
    userChatCollectionId
  );

  if (updateListDoc.documents.length === 0) {
    console.log('All documents deleted');
    return {
      success: true,
      message: 'Deleted all documents',
    };
  } else {
    console.log('Documents not deleted');
    return {
      success: false,
      message: 'Documents not deleted',
    };
  }
});
