#!/usr/bin/env node

const yargs = require('yargs')
const path = require('path')
const fs = require('fs')
const express = require('express')
const pkg = require('./package.json')
const coverageViewer = require('./')

const cli = yargs
  .usage('\nUsage: coverage-viewer <coverageFile> [options]')
  .example('coverage-viewer coverage.json -s ./src -o ./coverage')
  .describe('s', "The root of your project's source code directory")
  .describe('o', 'Where coverage-viewer should write output')
  .describe('u', 'Whether to start the express viewing server')
  .demandOption([ 's' ])
  .help('help')
  .alias('h', 'help')
  .version('v', pkg.version)
  .alias('v', 'version')

const resolve = dir => path.resolve(path.join('.', dir))

const options = {
  coverageFile: resolve(cli.argv._[0]),
  sourceRoot: resolve(cli.argv.s),
  outputFolder: resolve(cli.argv.o)
}

coverageViewer.render(options)

if (cli.argv.u) {
  fs.watch(options.coverageFile, (eventType, filename) => {
    if (filename) {
      console.log('Changed: ' + filename)
    }
    coverageViewer.render(options)
  })

  const app = express()
  app.get('/', (req, res) => {
    res.send(fs.readFileSync(options.outputFolder + '/index.html', 'utf8'))
  })

  app.get('*', (req, res) => {
    var filePath = ''
    const pathParts = req.url.split('/').slice(1)
    for (var item in pathParts) {
      filePath += '/' + pathParts[item]
    }
    res.send(fs.readFileSync(options.outputFolder + filePath, 'utf8'))
  })

  app.listen(3000, () => console.log('Example app listening on port 3000!'))
}
