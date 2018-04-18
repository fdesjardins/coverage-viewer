const { formatPercent, getPercentColor } = require('./common')

const Stats = ({ lineStats, branchStats, methodStats }) => `
  <label class='ui label'
    style='background-color: ${getPercentColor(methodStats.percentage)}'
  >
    ${methodStats.hit}/${methodStats.methods} Methods
    (${formatPercent(methodStats.percentage)})
  </label>

  <label class='ui label'
    style='background-color: ${getPercentColor(lineStats.percentage)}'
  >
    ${lineStats.hit}/${lineStats.lines} Lines
    (${formatPercent(lineStats.percentage)})
  </label>

  <label class='ui label'
    style='background-color: ${getPercentColor(branchStats.percentage)}'
  >
    ${branchStats.hit}/${branchStats.branches} Branches
    (${formatPercent(branchStats.percentage)})
  </label>
`

exports.Stats = Stats
