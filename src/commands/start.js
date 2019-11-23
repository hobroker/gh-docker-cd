import consola from 'consola';
import { CMD_NAME } from '../constants';
import exec from '../util/exec';
import remove from './remove';
import stop from './stop';

const createMeta = ({ project, env, commit }) => ({
  name: `${project}_${env}`,
  label: `${CMD_NAME}=${commit}`,
});

const createArgs = ({ publish }, meta) => {
  const args = ['-d', '--rm', `--name`, meta.name, '--label', meta.label];

  if (publish) {
    args.push('--publish', publish);
  }

  return args;
};

const stopAndTryToRemoveContainer = async id => {
  await stop.handler({ id });
  try {
    await remove.handler({ id });
  } catch (error) {
    consola.warn(error.stderr);
  }
};

const tryToHandleStartError = async (stderr, { name }) => {
  const namePattern = new RegExp(
    `name "\\/${name}" is already in use by container "(.*)"`,
  );

  const [, id] = namePattern.exec(stderr);
  if (!id) {
    throw new Error(`Tried to solve the error but could not: ${stderr}`);
  }

  if (namePattern.exec(stderr)) {
    await stopAndTryToRemoveContainer(id);
  }
};

const builder = parent =>
  parent
    .option('image', {
      desc: 'the docker image name',
      string: true,
      demandOption: true,
    })
    .option('project', {
      desc: 'the project ntame',
      string: true,
      demandOption: true,
    })
    .option('commit', {
      desc: 'the commit hash',
      string: true,
      demandOption: true,
    })
    .option('env', {
      desc: 'env',
      string: true,
      demandOption: true,
    })
    .option('publish', {
      desc: 'publish',
      alias: 'p',
      string: true,
    });

const handler = async options => {
  const { image } = options;

  const meta = createMeta(options);
  const args = createArgs(options, meta);

  const _start = () => exec('docker', ['run', ...args, image]);

  try {
    await _start();
  } catch (error) {
    const { stderr } = error;
    if (stderr) {
      consola.warn(stderr);
      await tryToHandleStartError(stderr, meta);
      await _start();
    } else {
      throw error;
    }
  }

  consola.success('started');
};

export default {
  command: 'start',
  aliases: ['up'],
  desc: 'start an app',
  builder,
  handler,
};
