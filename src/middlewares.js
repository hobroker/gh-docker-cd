import exec from './util/exec';

export const requireDocker = () => exec('docker', ['-v'], true);
