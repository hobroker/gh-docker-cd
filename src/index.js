import yargs from 'yargs';
import consola from 'consola';
import { CMD_NAME, REPOSITORY } from './constants';
import { requireDocker } from './middlewares';
import list from './commands/list';
import stop from './commands/stop';
import ping from './commands/ping';
import start from './commands/start';
import { handleError } from './util/error';

yargs
  .scriptName(CMD_NAME)
  .middleware(requireDocker)

  .command(list)
  .command(stop)
  .command(ping)
  .command(start)

  .demandCommand(1, 'I need a command to work')

  .fail(handleError)

  .help()
  .epilogue(`For more info, visit ${REPOSITORY}`)
  .parse();
