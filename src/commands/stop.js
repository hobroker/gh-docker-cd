import consola from 'consola';
import exec from '../util/exec';

const builder = parent =>
  parent.option('id', {
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
  command: 'stop',
  aliases: ['down'],
  desc: 'stop an app',
  builder,
  handler,
};
