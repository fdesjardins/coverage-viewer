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

  const getFiles = project => {
    const files = Object.keys(project)
    if (files.length === 0) {
      return null
    }
    return files.map(file => {
      return {
        file,
        classes: getClasses(project[file])
      }
    })
  }

  const getClasses = file => {
    const classes = Object.keys(file)
    if (classes.length === 0) {
      return null
    }
    return classes.map(className => {
      return {
        class: className,
        methods: getMethods(file[className])
      }
    })
  }

  const getMethods = coverageClass => {
    const methods = Object.keys(coverageClass)
    if (methods.length === 0) {
      return null
    }
    return methods.map(methodName => {
      return {
        method: methodName,
        lines: getLines(coverageClass[methodName])
      }
    })
  }

  const getLines = method => {
    const lines = Object.keys(method)
    if (lines.length === 0) {
      return null
    }
    return lines.map(lineNumber => {
      return {
        line: lineNumber,
        stats: getStats(method[lineNumber])
      }
    })
  }

  const getStats = line => {
    const stats = Object.keys(line)
    if (stats.length === 0) {
      return null
    }
    return stats.map(stat => {
      return {
        name: stat,
        value: line[stat]
      }
    })
  }

  return getProjects(coverage)
}

exports.json = transformJsonCoverage
