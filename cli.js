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
  .alias('u', 'up')
  .demandOption(['s'])
  .help('help')
  .alias('h', 'help')
  .version('v', pkg.version)
  .alias('v', 'version')

const options = {
  coverageFile: path.resolve(cli.argv._[0]),
  sourceRoot: path.resolve(cli.argv.s),
  outputFolder: path.resolve(cli.argv.o)
}

coverageViewer.render(options)

if (cli.argv.u) {
  // should watch for updates to the coverage file, and run the generator again
  // if any updates occur
  fs.watch(options.coverageFile, (eventType, filename) => {
    if (filename) {
      console.log(`Changed: ${filename}`)
    }
    coverageViewer.render(options)
  })

  // start express app
  const app = express()
  app.get('/', (req, res) => {
    res.send(
      fs.readFileSync(path.join(options.outputFolder, 'index.html'), 'utf8')
    )
  })

  // catch the request for a favicon
  app.get('/favicon.ico', (req, res) => {
    res.status(204)
  })

  app.get('*', (req, res) => {
    res.send(fs.readFileSync(path.join(options.outputFolder, req.url), 'utf8'))
  })

  app.listen(3000, () =>
    console.log('coverage-viewer listening at http://localhost:3000/')
  )
}
