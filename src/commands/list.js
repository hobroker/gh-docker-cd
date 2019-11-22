import consola from 'consola';
import exec from '../util/exec';
import { parseJsonOutput } from '../util/json';

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

  const result = await exec('docker', [
    'ps',
    '-a',
    '--format',
    '{{json .}}',
  ]).then(parseJsonOutput);

  const filtered = !filter
    ? result
    : result.filter(
        ({ ID, Image, Names, Labels }) =>
          Labels.startsWith('"ghcd=') &&
          [Names, Labels, ID, Image].some(item => item.includes(filter)),
      );

  consola.success(`found ${filtered.length} container(s)`);
  consola.success(filtered);
};

export default {
  command: 'list [filter]',
  aliase: ['ls'],
  desc: 'list the managed apps',
  builder,
  handler,
};
