import { repository } from '../../package';

export const CMD_NAME = 'ghcd';
export const REPOSITORY = repository;

export const DEPLOYMENT_STATUSES = {
  SUCCESS: 'success',
  ERROR: 'error',
  IN_PROGRESS: 'in_progress',
  INACTIVE: 'inactive',
  QUEUED: 'queued',
};
