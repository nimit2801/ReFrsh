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

// type account = {
//   $id: string;
//   $createdAt: string;
//   $updatedAt: string;
//   name: string;
//   password: string;
//   hash:
// }

const appwriteFunc = async function (req: any, res: any) {
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
    console.log('Project Id: ', req.variables['APPWRITE_FUNCTION_PROJECT_ID']);

    console.log(
      'Appwrite Function Data: ',
      req.variables['APPWRITE_FUNCTION_EVENT_DATA']
    );
    console.log('Appwrite URL: ', req.variables['APPWRITE_FUNCTION_ENDPOINT']);

    // Get user data from appwrite function event data
    const eventData = JSON.parse(req.variables['APPWRITE_FUNCTION_EVENT_DATA']);

    console.log('Event Data: ', eventData.$id);

    if (eventData.$id) {
      // Create a doc in User Session collection
      const databaseId = '6479a05b96a60acff24e';
      const userSessionCollectionId = '6479a070bbdfdddab0fd';
      const createUserSessionDoc = await database.createDocument(
        databaseId,
        userSessionCollectionId,
        eventData.$id,
        {
          sessionIds: [],
        }
      );
      console.log('Create User Session Doc: ', createUserSessionDoc);
    } else {
      console.log('No event data');
    }
  } catch (error: any) {
    console.log('Error: ', error.toString());
  }

  res.json({
    areDevelopersAwesome: true,
  });
};

export default appwriteFunc;
