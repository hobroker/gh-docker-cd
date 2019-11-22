import signale from 'signale';
import exec from '../util/exec';

const builder = yargs =>
  yargs.option('id', {
    desc: 'container ID',
    demandCommand: true,
    string: true,
  });

/**
 * @param {String} id
 */
const handler = async ({ id }) => {
  signale.pending(`stopping container ${id}`);

  await exec('docker', ['stop', id]);

  signale.complete(`container ${id} was stopped`);
};

export default {
  command: 'stop [id]',
  desc: 'stop an app',
  builder,
  handler,
};
