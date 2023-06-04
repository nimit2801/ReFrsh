import appwriteFunc from './index';
import dotnev from 'dotenv';

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
dotnev.config();
const req = {
  headers: [{ 'DEMO-HEADER': 'Hello' }],
  payload: {},
  variables: {
    APPWRITE_FUNCTION_ENDPOINT: process.env.APPWRITE_FUNCTION_ENDPOINT,
    APPWRITE_FUNCTION_PROJECT_ID: process.env.APPWRITE_FUNCTION_PROJECT_ID,
    APPWRITE_FUNCTION_API_KEY: process.env.APPWRITE_FUNCTION_API_KEY,
    APPWRITE_DATABASE_ID: '',
    APPWRITE_FUNCTION_EVENT_DATA: {
      $id: '1',
    },
  },
};

const res = {
  send: (text: String, status: Number) => {
    return { text, status };
  },
  json: (Object: any, status: Number) => {
    return { Object, status };
  },
};

appwriteFunc(req, res);
