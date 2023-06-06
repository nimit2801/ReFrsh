export default defineEventHandler(async (event) => {
  console.log('EVENT: ', event.req.url);
});
