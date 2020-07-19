// eslint-disable-next-line valid-jsdoc
/** A safeguard middleware to ensure uncaught errors are returned as server errors. */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default () => {
  return {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    onError: (handler, next) => {
      // TODO: improve
      if (handler.error.statusCode && handler.error.message) {
        handler.response = {
          statusCode: handler.error.statusCode,
          body: JSON.stringify({
            message: handler.error.message,
            blame: handler.error?.details?.blame,
            details: handler.error?.details,
          }),
        };
      } else if (
        handler.error &&
        (!handler.response ||
          !handler.response.statusCode ||
          handler.response.statusCode < 400)
      ) {
        console.error(handler.error);
        handler.response = {
          statusCode: 500,
          body: JSON.stringify({
            message: 'Internal Application Server Error',
          }),
        };
      }

      return next();
    },
  };
};
