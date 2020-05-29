const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')

const { json } = require('./transforms')
const { SummaryPage } = require('./renderers/html/SummaryPage')
const { FilePage } = require('./renderers/html/FilePage')
const {
  getLineStats,
  getBranchStats,
  getMethodStats,
  getFileStats
} = require('./statistics')

exports.renderIndex = (coverage, options) => {
  return SummaryPage({
    stats: {
      lineStats: getLineStats(coverage),
      branchStats: getBranchStats(coverage),
      methodStats: getMethodStats(coverage)
    },
    files: getFileStats(coverage),
    relativeTo: options.relativeTo
  })
}

const renderFile = (file, options) => {
  const wrapped = [
    {
      files: [ file ]
    }
  ]

  const fileStats = getFileStats(wrapped)[0]

  return FilePage({
    name: file.file,
    content: fs.readFileSync(file.file),
    stats: fileStats,
    relativeTo: options.relativeTo
  })
}

exports.renderFiles = (coverage, options) => {
  const files = []
  coverage.map(coverageEntry => {
    files.push.apply(files, coverageEntry.files)
  })
  return files.map(file => {
    return {
      filename: file.file.split(options.relativeTo + path.sep)[1],
      html: renderFile(file, options)
    }
  })
}

exports.render = ({ coverageFile, outputFolder, sourceRoot }) => {
  fs.readFile(coverageFile, (err, content) => {
    if (err) {
      console.error(err)
      return
    }

    const coverage = json(JSON.parse(content))

    mkdirp.sync(outputFolder)
    fs.writeFileSync(
      `${outputFolder}/index.html`,
      exports.renderIndex(coverage, { relativeTo: sourceRoot })
    )

    exports.renderFiles(coverage, { relativeTo: sourceRoot }).map(filePage => {
      const outFile = path.join(outputFolder, 'files', filePage.filename)
      mkdirp.sync(path.dirname(outFile))
      fs.writeFileSync(`${outFile}.html`, filePage.html)
    })
  })
}
