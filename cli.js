#!/usr/bin/env node

const yargs = require('yargs')
const path = require('path')
const pkg = require('./package.json')
const coverageViewer = require('./')

const cli = yargs
  .usage('\nUsage: coverage-viewer <coverageFile> [options]')
  .example('coverage-viewer coverage.json -s ./src -o ./coverage')
  // .nargs(1)
  .describe('s', "The root of your project's source code directory")
  .describe('o', 'Where coverage-viewer should write output')
  .demandOption([ 's' ])
  .help('help')
  .alias('h', 'help')
  .version('v', pkg.version)
  .alias('v', 'version')

const resolve = dir => path.join(__dirname, dir)

const options = {
  coverageFile: resolve(cli.argv._[0]),
  sourceRoot: resolve(cli.argv.s),
  outputFolder: resolve(cli.argv.o)
}

coverageViewer.render(options)
