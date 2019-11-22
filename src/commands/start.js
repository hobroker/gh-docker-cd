import consola from 'consola';
import { CMD_NAME } from '../constants';
import exec from '../util/exec';

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
  await exec('docker', [
    'run',
    '-d',
    `--name=${project}_${env}_${commit}`,
    `--label="${CMD_NAME}=${commit}"`,
    image,
  ]);

  consola.success('started');
};

export default {
  command: 'start <image>',
  desc: 'start an app',
  builder,
  handler,
};
