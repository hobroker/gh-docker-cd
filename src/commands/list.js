import signale from 'signale';
import { CMD_NAME } from '../constants';
import exec from '../util/exec';

/**
 * @param yargs
 * @returns {*}
 */
const builder = yargs =>
  yargs.option('filter', {
    desc: 'something to search for',
    string: true,
    default: '',
  });

/**
 * @param {String} [filter]
 */
const handler = async ({ filter }) => {
  if (filter) {
    signale.info('filter=%s', filter);
  }

  const result = await exec('docker', [
    'ps',
    '-a',
    '--filter',
    `label=${CMD_NAME}`,
  ]);

  const filterPattern = new RegExp(filter);
  const filtered = result.stdout.split`\n`.filter(
    (line, index) => !index || filterPattern.test(line),
  );

  const count = filtered.length - 1;

  signale.complete(`found ${count} containers\n%s`, filtered.join`\n`);
};

export default {
  command: 'list [filter]',
  aliase: ['ls'],
  desc: 'list the managed apps',
  builder,
  handler,
};
