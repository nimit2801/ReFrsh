import { Client, Databases, Permission, Models, Role } from 'node-appwrite';

type createResponse = {
  success: boolean;
  message: string;
};

interface Doc extends Models.Document {
  password: string;
  createdBy: string;
  sharedWith: string;
}

export default defineEventHandler(async (event): Promise<createResponse> => {
  const runtimeConfig = useRuntimeConfig();
  const { sessionId, password, userId } = await readBody(event);

  const client = new Client();
  client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('647986a45b07d841d978')
    .setKey(runtimeConfig.apiSecret)
    .setSelfSigned(true);

  const database = new Databases(client);
  try {
    console.log(sessionId, password, userId);

    const getDoc: Doc = await database.getDocument(
      runtimeConfig.public.databaseId,
      runtimeConfig.public.sessionsCollectionId,
      String(sessionId)
    );
    console.log('Get Doc: ', getDoc);

    if (getDoc.$id) {
      if (getDoc.password === password) {
        console.log('lets update');

        const updateAccessOfUser = await database.updateDocument(
          runtimeConfig.public.databaseId,
          runtimeConfig.public.sessionsCollectionId,
          String(sessionId),
          {
            sharedWith: userId,
          },
          [
            Permission.read(Role.user(userId)),
            Permission.update(Role.user(userId)),
            Permission.read(Role.user(getDoc.createdBy)),
            Permission.update(Role.user(getDoc.createdBy)),
          ]
        );
        console.log('Update Access: ', updateAccessOfUser);
      } else {
        console.log('Password is incorrect');
        return {
          success: false,
          message: 'Password is incorrect',
        };
      }
    }
  } catch (error) {
    console.log(error.toString());
  }

  return {
    success: true,
    message: 'Hello World',
  };
});
