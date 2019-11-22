import consola from 'consola';
import { CMD_NAME } from '../constants';
import exec from '../util/exec';
import { findContainers } from './list';
import stop from './stop';
import remove from './remove';

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

  const startArgs = [
    'run',
    '-d',
    `--name=${meta.name}`,
    `--label=${meta.label}`,
    image,
  ];

  const _start = () => exec('docker', startArgs);

  try {
    await _start();
  } catch (error) {
    const { stderr } = error;
    if (stderr) {
      const namePattern = new RegExp(
        `name "\\/${meta.name}" is already in use by container`,
      );
      if (namePattern.test(stderr)) {
        const [container] = await findContainers({ filter: meta.label });
        await stop.handler({ id: container.ID });
        await remove.handler({ id: container.ID });
        await _start();
      }
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
