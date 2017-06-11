/* eslint-disable */
const execSync = require('child_process').execSync;
const rimraf = require('rimraf');
const umdFileName = process.argv[2];

if (typeof umdFileName === 'undefined') {
  console.error("umd package name required");
  process.exit(1);
}

try {
  rimraf.sync('./dist');
} catch(err) {
  console.error(err);
  process.exit(1);
}

const exec = (command, extraEnv) =>
  execSync(command, {
    stdio: 'inherit',
    env: Object.assign({}, process.env, extraEnv)
  })

console.log('Building CommonJS modules ...');
exec('babel src/ -d dist/cjs', {
    BABEL_ENV: 'cjs',
});

console.log('\nBuilding ES modules ...');

exec('babel src/ -d dist/es', {
    BABEL_ENV: 'es',
});

console.log('\nBuilding '+ umdFileName + '.js ...');

exec('webpack src/index.js dist/umd/' + umdFileName + '.js', {
    NODE_ENV: 'production',
});

console.log('\nBuilding '+ umdFileName + '.min.js ...');

exec('webpack -p src/index.js dist/umd/' + umdFileName + '.min.js', {
    NODE_ENV: 'production',
});
