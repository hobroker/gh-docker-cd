import consola from 'consola';
import exec from '../util/exec';
import { parseJsonOutput } from '../util/json';

/**
 * @param {String} [filter]
 */
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

const builder = parent =>
  parent.option('filter', {
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

  const containers = await findContainers({ filter });

  consola.success(`found ${containers.length} container(s)`);
  consola.success(containers);
};

export default {
  command: 'list',
  aliases: ['ls'],
  desc: 'list the managed apps',
  builder,
  handler,
};
