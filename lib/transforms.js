const transformJsonCoverage = coverage => {
  const getProjects = coverage => {
    const projects = Object.keys(coverage)
    if (projects.length === 0) {
      return null
    }
    return projects.map(project => {
      return {
        project,
        files: getFiles(coverage[project])
      }
    })
  }

  const getFiles = (exports.getFiles = project => {
    const files = Object.keys(project)
    if (files.length === 0) {
      return []
    }
    return files.map(file => {
      return {
        file,
        classes: getClasses(project[file])
      }
    })
  })

  const getClasses = (exports.getClasses = file => {
    const classes = Object.keys(file)
    if (classes.length === 0) {
      return []
    }
    return classes.map(className => {
      return {
        class: className,
        methods: getMethods(file[className])
      }
    })
  })

  const getMethods = (exports.getMethods = coverageClass => {
    const methods = Object.keys(coverageClass)
    if (methods.length === 0) {
      return []
    }
    return methods.map(methodName => {
      return {
        method: methodName,
        lines: getLines(coverageClass[methodName]),
        branches: coverageClass[methodName].Branches
      }
    })
  })

  const getLines = (exports.getLines = method => {
    if (!method || !method.Lines) {
      return []
    }
    const lines = Object.keys(method.Lines)
    if (lines.length === 0) {
      return []
    }
    return lines.map(lineNumber => {
      return {
        line: lineNumber,
        stats: [
          {
            name: 'Hits',
            value: lines[lineNumber]
          }
        ]
      }
    })
  })

  return getProjects(coverage)
}

exports.json = transformJsonCoverage
