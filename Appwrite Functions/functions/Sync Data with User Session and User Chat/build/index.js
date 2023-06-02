"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_appwrite_1 = __importDefault(require("node-appwrite"));
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
module.exports = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var client, account, avatars, database, functions, health, locale, storage, teams, users, data, databaseId, userSesssionCollectionId, getUserSessionDoc, sessions, userSession, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = new node_appwrite_1.default.Client();
                    account = new node_appwrite_1.default.Account(client);
                    avatars = new node_appwrite_1.default.Avatars(client);
                    database = new node_appwrite_1.default.Databases(client);
                    functions = new node_appwrite_1.default.Functions(client);
                    health = new node_appwrite_1.default.Health(client);
                    locale = new node_appwrite_1.default.Locale(client);
                    storage = new node_appwrite_1.default.Storage(client);
                    teams = new node_appwrite_1.default.Teams(client);
                    users = new node_appwrite_1.default.Users(client);
                    if (!req.variables['APPWRITE_FUNCTION_ENDPOINT'] ||
                        !req.variables['APPWRITE_FUNCTION_API_KEY']) {
                        console.log('Environment variables are not set. Function cannot use Appwrite SDK.');
                    }
                    else {
                        client
                            .setEndpoint(req.variables['APPWRITE_FUNCTION_ENDPOINT'])
                            .setProject(req.variables['APPWRITE_FUNCTION_PROJECT_ID'])
                            .setKey(req.variables['APPWRITE_FUNCTION_API_KEY']);
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    console.log('Appwrite Funcion API Key: ', req.variables['APPWRITE_FUNCTION_API_KEY']);
                    console.log('Appwrite Function Data: ', req.variables['APPWRITE_FUNCTION_EVENT_DATA']);
                    data = JSON.parse(req.variables['APPWRITE_FUNCTION_EVENT_DATA']);
                    databaseId = '6479a05b96a60acff24e';
                    userSesssionCollectionId = '6479a070bbdfdddab0fd';
                    return [4 /*yield*/, database.getDocument(databaseId, userSesssionCollectionId, data.createdBy)];
                case 2:
                    getUserSessionDoc = _a.sent();
                    console.log('User Session: ', getUserSessionDoc);
                    return [4 /*yield*/, getUserSessionDoc.sessionIds];
                case 3:
                    sessions = _a.sent();
                    // Add session to sessions array
                    // TODO: If some value null remove it
                    sessions.push(data.$id);
                    console.log('Sessions pushed: ', sessions);
                    return [4 /*yield*/, database.updateDocument(databaseId, userSesssionCollectionId, data.createdBy, {
                            sessionIds: sessions,
                        })];
                case 4:
                    userSession = _a.sent();
                    console.log('User: ', userSession);
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    console.log('Error: ', error_1.toString());
                    return [3 /*break*/, 6];
                case 6:
                    res.json({
                        areDevelopersAwesome: true,
                    });
                    return [2 /*return*/];
            }
        });
    });
};
