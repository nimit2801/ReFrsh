"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("./index"));
var dotenv_1 = __importDefault(require("dotenv"));
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
dotenv_1.default.config();
var req = {
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
var res = {
    send: function (text, status) {
        return { text: text, status: status };
    },
    json: function (Object, status) {
        return { Object: Object, status: status };
    },
};
(0, index_1.default)(req, res);
