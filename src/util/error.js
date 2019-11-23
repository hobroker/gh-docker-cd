import consola from 'consola';

export const handleError = (error, exitCode = 1) => {
  const errors = [].concat(error);

  consola.fatal(...errors);
  if (exitCode === true) {
    process.exit(exitCode);
  }
};

export const handleYargsError = (message, error) => {
  if (message) {
    return handleError(message);
  }

  if (!error) {
    return null;
  }

  if (error.exitCode) {
    return handleError([error.stderr, error], error.exitCode);
  }

  return handleError(error);
};
