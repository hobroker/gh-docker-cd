#!/usr/bin/env node

import yargs from 'yargs';
import { CMD_NAME, REPOSITORY } from './constants';
import list from './commands/list';
import stop from './commands/stop';
import ping from './commands/ping';
import start from './commands/start';
import remove from './commands/remove';
import restart from './commands/restart';
import { requireDocker } from './middlewares';
import { handleYargsError } from './util/error';

yargs
  .scriptName(CMD_NAME)
  .middleware(requireDocker)

  .command(list)
  .command(stop)
  .command(start)
  .command(restart)
  .command(remove)
  .command(ping)

  .demandCommand(1, 'I need a command to work')

  .fail(handleYargsError)
  .epilogue(`For more info, visit ${REPOSITORY}`)
  .parse();
