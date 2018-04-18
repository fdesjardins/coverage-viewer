const { Layout } = require('./Layout')
const { Stats } = require('./Stats')
const { colors } = require('./common')

const FilePage = ({ stats, content, relativeTo }) => {
  return Layout({
    head: `
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.36.0/codemirror.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.36.0/theme/neo.min.css" />
      <style>
        .page-header {
          height: 95px;
          margin: 0;
        }
        .CodeMirror {
          width: 100%;
          height: calc(100vh - 160px);
          font-size: .85em;
          line-height: 1.2em;
        }
        .CodeMirror .highlight.hit {
          background: ${colors.lgreen};
        }
        .CodeMirror .highlight.miss {
          background: ${colors.lred};
        }
      </style>
    `,
    body: `
      <div class='page-header'>
        <h3>${stats.name.split(relativeTo)[1]}</h3>
        ${Stats(stats)}
      </div>

      <textarea id='code'>${content}</textarea>
    `,
    scripts: `
      <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.36.0/codemirror.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.36.0/mode/clike/clike.min.js"></script>
      <script>
        (() => {
          const code = CodeMirror.fromTextArea(document.getElementById('code'), {
            lineNumbers: true,
            theme: 'neo',
            mode: 'text/x-csharp',
            readOnly: true
          })

          const highlightLine = (lineNumber, className) => {
            code.addLineClass(lineNumber, 'gutter','highlight')
            code.addLineClass(lineNumber, 'gutter', className)
            code.addLineClass(lineNumber, 'wrap','highlight')
            code.addLineClass(lineNumber, 'wrap', className)
          }

          const linesHit = ${JSON.stringify(stats.coverage.hit)}
          linesHit.map(line => highlightLine(parseInt(line.line) - 1, 'hit'))

          const linesMissed = ${JSON.stringify(stats.coverage.missed)}
          linesMissed.map(line => highlightLine(parseInt(line.line) - 1, 'miss'))
        })()
      </script>
    `
  })
}

exports.FilePage = FilePage
