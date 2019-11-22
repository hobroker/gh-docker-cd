import consola from 'consola';
import { CMD_NAME } from '../constants';
import exec from '../util/exec';
import stop from './stop';
import remove from './remove';

const tryToHandleStartError = async (stderr, { name }) => {
  const namePattern = new RegExp(
    `name "\\/${name}" is already in use by container "(.*)"`,
  );

  const [, id] = namePattern.exec(stderr);
  if (!id) {
    consola.error(stderr);
    throw new Error('Tried to solve the error but could not');
  }

  if (namePattern.exec(stderr)) {
    await stop.handler({ id });
    await remove.handler({ id });
  }
};

const builder = yargs =>
  yargs
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
    });

const handler = async ({ commit, env, image, project }) => {
  const meta = {
    name: `${project}_${env}`,
    label: `"${CMD_NAME}=${commit}"`,
  };

  const _start = () =>
    exec('docker', [
      'run',
      '-d',
      '--rm',
      `--name=${meta.name}`,
      `--label=${meta.label}`,
      image,
    ]);

  try {
    await _start();
  } catch (error) {
    const { stderr } = error;
    if (stderr) {
      await tryToHandleStartError(stderr, meta);
      await _start();
    } else {
      throw error;
    }
  }

  consola.success('started');
};

export default {
  command: 'start <image>',
  desc: 'start an app',
  builder,
  handler,
};
