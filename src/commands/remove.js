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
  consola.info(`removing container ${id}`);

  await exec('docker', ['rm', id]);

  consola.success(`container ${id} was removed`);
};

export default {
  command: 'remove',
  aliases: ['rm'],
  desc: 'removes an app',
  builder,
  handler,
};
