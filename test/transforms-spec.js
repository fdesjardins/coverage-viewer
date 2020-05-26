/* global describe, it */

const assert = require('chai').assert
const transforms = require('../lib/transforms')
const fixture = require('./fixtures/coverage.json')

describe('transforms', () => {
  const numProjects = Object.keys(fixture).length
  const projectName = Object.keys(fixture)[0]
  const project = fixture[projectName]

  it('should transformJsonCoverage', () => {
    const files = Object.keys(project)
    const transformed = transforms.json(fixture)
    assert.equal(transformed.length, numProjects)
    assert.equal(transformed[0].project, projectName)
    assert.equal(transformed[0].files.length, files.length)
  })

  it('should getFiles', () => {
    const files = Object.keys(project)
    const transformed = transforms.getFiles(project)
    assert.equal(transformed.length, files.length)
  })

  it('should getClasses', () => {
    const files = Object.keys(project)
    const file = project[files[0]]
    const classes = Object.keys(file)
    const transformed = transforms.getClasses(file)
    assert.equal(transformed.length, classes.length)
  })

  it('should getMethods', () => {
    const files = Object.keys(project)
    const file = project[files[0]]
    const classes = Object.keys(file)
    const classObj = file[classes[0]]
    const methods = Object.keys(classObj)
    const transformed = transforms.getMethods(classObj)
    assert.equal(transformed.length, methods.length)
  })

  it('should getLines', () => {
    const files = Object.keys(project)
    const file = project[files[0]]
    const classes = Object.keys(file)
    const classObj = file[classes[0]]
    const methods = Object.keys(classObj)
    const method = classObj[methods[1]]
    const lines = Object.keys(method.Lines)

    const transformed = transforms.getLines(method)

    assert.equal(transformed.length, lines.length)

    transformed.forEach((transformedLine, i) => {
      const lineNumber = transformedLine.line;
      const transformedHitCount = transformedLine.stats.find(s => s.name === 'Hits').value;
      const originalHitCount = method.Lines[lineNumber];
      assert.equal(transformedHitCount, originalHitCount)
    });
  })
})
