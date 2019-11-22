import consola from 'consola';
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
  consola.info(`stopping container ${id}`);

  await exec('docker', ['stop', id]);

  consola.success(`container ${id} was stopped`);
};

export default {
  command: 'stop [id]',
  desc: 'stop an app',
  builder,
  handler,
};
