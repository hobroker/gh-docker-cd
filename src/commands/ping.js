import signale from 'signale';

const handler = () => {
  signale.complete('pong');
};

export default {
  command: 'ping',
  desc: 'pong',
  builder: undefined,
  handler,
};
