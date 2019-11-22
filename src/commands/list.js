import consola from 'consola';
import exec from '../util/exec';
import { parseJsonOutput } from '../util/json';

export const findContainers = async ({ filter = '' }) => {
  const result = await exec('docker', [
    'ps',
    '-a',
    '--format',
    '{{json .}}',
  ]).then(parseJsonOutput);

  if (!filter) {
    return result;
  }

  const filterFn = ({ ID, Image, Names, Labels }) =>
    Labels.startsWith('"ghcd=') &&
    [Names, Labels, ID, Image].some(item => item.includes(filter));

  return result.filter(filterFn);
};

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
    consola.info('filter=%s', filter);
  }

  const data = await findContainers({ filter });

  consola.success(`found ${data.length} container(s)`);
};

export default {
  command: 'list [filter]',
  aliases: ['ls'],
  desc: 'list the managed apps',
  builder,
  handler,
};
