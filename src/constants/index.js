import { bin } from '../../package';

export const CMD_NAME = Object.keys(bin).pop() || 'ghcd';
export const REPOSITORY = 'https://github.com/hobroker/gh-docker-cd';

export const DEPLOYMENT_STATUSES = {
  SUCCESS: 'success',
  ERROR: 'error',
  IN_PROGRESS: 'in_progress',
  INACTIVE: 'inactive',
  QUEUED: 'queued',
};
