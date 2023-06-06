import { Client, Databases } from 'node-appwrite';

type createResponse = {
  success: boolean;
  message: string;
};

export default defineEventHandler(async (event): Promise<createResponse> => {
  const client = new Client();
  client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('647986a45b07d841d978')
    .setKey(
      'bc1e3cdfeed95c996abd4bac462f3353f2fcc33384abdca1925e40d5f15c0124c5cdae3475443b18be33bf7a32a8a5d485e0eb4edf42f3ee0c9c90d4777fef1af37d2a2d33389903b325b30c73c05c9b6d2deee15f81238968ec6bc610f65f2e28b19eb929c3b759867f201ad4998d07551467d1f2a3b1a824b203cee94f1745'
    )
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
