import consola from 'consola';

const handler = () => {
  consola.success('pong');
};

export default {
  command: 'ping',
  desc: 'pong',
  builder: undefined,
  handler,
};
