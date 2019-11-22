import signale from 'signale';

const builder = yargs =>
  yargs.option('image', {
    desc: 'the docker image name',
    string: true,
    demandOption: true,
  });

const handler = ({ image }) => {
  signale.pending('TODO', image);
};

export default {
  command: 'start <image>',
  desc: 'start an app',
  builder,
  handler,
};
