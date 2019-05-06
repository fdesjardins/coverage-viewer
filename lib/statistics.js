const getAllFiles = data => data.map(project => project.files).flat()

const getAllClasses = data =>
  getAllFiles(data)
    .map(file => file.classes)
    .flat()

const getAllMethods = data =>
  getAllClasses(data)
    .map(_class => _class.methods)
    .flat()

const getAllLines = data =>
  getAllMethods(data)
    .map(method => method.lines)
    .flat()

const getLinesHit = lines =>
  lines.filter(
    line => line.stats.find(stat => stat.name === 'Hits').value !== 0
  )

const getLinesMissed = lines =>
  lines.filter(
    line => line.stats.find(stat => stat.name === 'Hits').value === 0
  )

const getBranches = data =>
  getAllMethods(data)
    .map(method => method.branches)
    .flat()

const getBranchesHit = branches => branches.filter(branch => branch.Hits !== 0)

const getLineStats = (exports.getLineStats = data => {
  const lines = getAllLines(data)
  const linesHit = getLinesHit(lines)

  return {
    lines: lines.length,
    hit: linesHit.length,
    missed: lines.length - linesHit.length,
    percentage: linesHit.length / lines.length
  }
})

const getBranchStats = (exports.getBranchStats = data => {
  const branches = getBranches(data)
  const branchesHit = getBranchesHit(branches)

  return {
    branches: branches.length,
    hit: branchesHit.length,
    missed: branches.length - branchesHit.length,
    percentage: branchesHit.length / branches.length
  }
})

const getMethodStats = (exports.getMethodStats = data => {
  const methods = getAllMethods(data)

  const methodsHit = methods.filter(method => {
    const linesHit = getLinesHit(method.lines)
    return linesHit.length > 0
  })

  return {
    methods: methods.length,
    hit: methodsHit.length,
    missed: methods.length - methodsHit.length,
    percentage: methodsHit.length / methods.length
  }
})

const wrap = el => [
  {
    files: [ el ]
  }
]

const getFileCoverage = file => {
  const lines = getAllLines(wrap(file))
  const hit = getLinesHit(lines)
  const missed = getLinesMissed(lines)
  return {
    lines,
    hit,
    missed
  }
}

exports.getFileStats = data => {
  const files = getAllFiles(data)

  return files.map(file => {
    return {
      name: file.file,
      lineStats: getLineStats(wrap(file)),
      branchStats: getBranchStats(wrap(file)),
      methodStats: getMethodStats(wrap(file)),
      coverage: getFileCoverage(file)
    }
  })
}
