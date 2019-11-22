import consola from 'consola';

export const handleError = (...args) => {
  consola.error(...args);
  process.exit(1);

  return null;
};
