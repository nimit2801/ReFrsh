export default defineEventHandler((event) => {
  const runtimeConfig = useRuntimeConfig();
  console.log(runtimeConfig.apiSecret);

  return {
    hello: 'world',
  };
});
