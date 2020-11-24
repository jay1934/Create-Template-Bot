import execa from 'execa';

export default async function init(log) {
  return new Promise(async (resolve) => {
    log('Initializing Git...', 'green');
    const result = await execa('git', ['init']);
    if (result.failed) log('Initialization Failed', 'red');
    else log('Initialization Completed', 'green');
    resolve();
  });
}
