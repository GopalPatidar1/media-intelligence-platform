export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:response', (response, { event }) => {
    const error = event.context.error;

    if (error) {
      response.body = {
        success: false,
        statusCode: error.statusCode || 500,
        statusMessage: error.statusMessage || 'Something went wrong',
      };
    }
  });
});
