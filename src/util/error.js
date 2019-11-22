import consola from 'consola';

export const handleYargsError = (message, error) => {
  error = error || message;

  const code = error.exitCode || 1;

  const errors = [error];
  // add errors from execa's stdout
  if (error.stderr) {
    errors.unshift(error.stderr);
  }

  consola.error(...errors);
  process.exit(code);

  return null;
};
