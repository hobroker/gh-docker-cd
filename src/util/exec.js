import consola from 'consola';
import execa from 'execa';
import { handleError } from './error';

/**
 * @param {String} command
 * @param {Array<String>} [args=[]]
 * @param {Boolean} [logOutput=false]
 * @param {Boolean} [logCommand=false]
 * @returns {Promise<null|String>}
 */
const exec = async (
  command,
  args = [],
  logOutput = false,
  logCommand = true,
) => {
  const argsString = args.join` `;

  try {
    if (logCommand) {
      consola.info('$', command, argsString);
    }

    const result = await execa(command, args);

    if (logOutput) {
      consola.info('>', result.stdout || result.stderr);
    }

    return result.stdout;
  } catch (error) {
    return handleError(error.stderr, `[exitCode=${error.exitCode}]`);
  }
};

export default exec;
