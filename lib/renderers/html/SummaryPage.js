const path = require('path')
const { Layout } = require('./Layout')
const { Stats } = require('./Stats')
const { formatPercent, getPercentColor } = require('./common')

const Bar = percentage => {
  if (percentage || percentage === 0) {
    return `
      <div class='ui progress' style='margin: 0;'>
        <div class='bar'
          style='width: ${formatPercent(percentage)};
          background-color: ${getPercentColor(percentage)};
          height: 15px;'
        />
      </div>
    `
  }
  return ''
}

const Table = ({ files, relativeTo }) => {
  const rows = files
    .map(
      f => `
    <tr>
      <td>
        <a href='/files/${f.name.split(relativeTo)[1]}.html'>
          ${f.name.split(relativeTo)[1]}
        </a>
      </td>

      <td>${Bar(f.lineStats.percentage)}</td>
      <td>${f.lineStats.hit}/${f.lineStats.lines}</td>
      <td>${formatPercent(f.lineStats.percentage)}</td>

      <td>${Bar(f.branchStats.percentage)}</td>
      <td>${formatPercent(f.branchStats.percentage)}</td>
      <td>${f.branchStats.hit}/${f.branchStats.branches}</td>

      <td>${Bar(f.methodStats.percentage)}</td>
      <td>${formatPercent(f.methodStats.percentage)}</td>
      <td>${f.methodStats.hit}/${f.methodStats.methods}</td>
    </tr>
  `
    )
    .join('')

  return `
    <table class='ui celled striped table sortable-theme-minimal' data-sortable>
      <thead>
        <tr>
          <th>File</th>
          <th>Lines</th>
          <th></th>
          <th></th>
          <th>Branches</th>
          <th></th>
          <th></th>
          <th>Methods</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      <tbody>
    </table>
  `
}

exports.SummaryPage = ({ stats, files, relativeTo }) =>
  Layout({
    head: `
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/sortable/0.8.0/css/sortable-theme-minimal.css" />
    `,
    body: `
      <h2>Summary</h2>
      ${Stats(stats)}

      ${Table({ files, relativeTo: relativeTo + path.sep })}
    `,
    scripts: `
      <script src="https://cdnjs.cloudflare.com/ajax/libs/sortable/0.8.0/js/sortable.min.js"></script>
    `
  })
