// @ts-check
require('es6-promise/auto');
require('reflect-metadata');
const { Container } = require('inversify');
const { CoreFrontendModule } = require('@webserverless/core/lib/browser');
const { CONFIG } = require('@webserverless/core/lib/common/config-provider');
const config = process.env;
const { HelloWorldService } = require('{{ projectName }}-extension/lib/browser/hello-world-service');


const container = new Container();
container.load(CoreFrontendModule);
config.endpoint = window['endpoint'];
window[CONFIG] = config;

function load(raw) {
  return Promise.resolve(raw.default).then(module =>
    container.load(module)
  )
}

function start() {
  const helloWorldService = container.get(HelloWorldService);
}

module.exports = Promise.resolve()
  .{{ Extension.generateImports(extensions, 'frontend', 'import') }}
    .then(start).catch(reason => {
    console.error('Failed to start the frontend application.');
    if (reason) {
      console.error(reason);
    }
  });
