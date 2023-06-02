import sdk, { ID, Query } from 'node-appwrite';
import { GraphQLClient } from 'graphql-request';
import ShortUniqueId from 'short-unique-id';

/*
  'req' variable has:
    'headers' - object with request headers
    'payload' - request body data as a string
    'variables' - object with function variables

  'res' variable has:
    'send(text, status)' - function to return text response. Status code defaults to 200
    'json(obj, status)' - function to return JSON response. Status code defaults to 200

  If an error is thrown, a response with code 500 will be returned.
*/

module.exports = async function (req: any, res: any) {
  const client = new sdk.Client();

  // You can remove services you don't use
  const account = new sdk.Account(client);
  const avatars = new sdk.Avatars(client);
  const database = new sdk.Databases(client);
  const functions = new sdk.Functions(client);
  const health = new sdk.Health(client);
  const locale = new sdk.Locale(client);
  const storage = new sdk.Storage(client);
  const teams = new sdk.Teams(client);
  const users = new sdk.Users(client);

  if (
    !req.variables['APPWRITE_FUNCTION_ENDPOINT'] ||
    !req.variables['APPWRITE_FUNCTION_API_KEY']
  ) {
    console.log(
      'Environment variables are not set. Function cannot use Appwrite SDK.'
    );
  } else {
    client
      .setEndpoint(req.variables['APPWRITE_FUNCTION_ENDPOINT'])
      .setProject(req.variables['APPWRITE_FUNCTION_PROJECT_ID'])
      .setKey(req.variables['APPWRITE_FUNCTION_API_KEY']);
  }
  try {
    console.log(
      'Appwrite Funcion API Key: ',
      req.variables['APPWRITE_FUNCTION_API_KEY']
    );

    console.log(
      'Appwrite Function Data: ',
      req.variables['APPWRITE_FUNCTION_EVENT_DATA']
    );
    const data = JSON.parse(req.variables['APPWRITE_FUNCTION_EVENT_DATA']);
    const databaseId = '6479a05b96a60acff24e';
    // Add doc sessionId to User Session
    const userSesssionCollectionId = '6479a070bbdfdddab0fd';
    const getUserSessionDoc: any = await database.getDocument(
      databaseId,
      userSesssionCollectionId,
      data.createdBy
    );
    console.log('User Session: ', getUserSessionDoc);

    const sessions = await getUserSessionDoc.sessionIds;
    // Add session to sessions array
    // TODO: If some value null remove it
    sessions.push(data.$id);
    console.log('Sessions pushed: ', sessions);

    const userSession = await database.updateDocument(
      databaseId,
      userSesssionCollectionId,
      data.createdBy,
      {
        sessionIds: sessions,
      }
    );
    console.log('User: ', userSession);
  } catch (error: any) {
    console.log('Error: ', error.toString());
  }

  res.json({
    areDevelopersAwesome: true,
  });
};
