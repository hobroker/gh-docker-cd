import { Signale } from 'signale';
import execa from 'execa';

const log = new Signale({
  types: {
    run: {
      badge: '$',
      color: 'yellow',
      label: 'run',
      logLevel: 'warn',
    },
  },
});

const handleError = (error, code = 1) => {
  log.error(error);
  process.exit(code);
};

/**
 * @param {String} command
 * @param {Array<String>} [args=[]]
 * @param {Boolean} [logOutput=false]
 * @returns {Promise<void | Object>}
 */
const exec = async (command, args = [], logOutput = false) => {
  const argsString = args.join` `;

  try {
    log.run(command, argsString);

    const result = await execa(command, args);

    if (logOutput) {
      log.info(result.stdout || result.stderr);
    }

    return result;
  } catch (error) {
    return handleError(error);
  }
};

export default exec;
