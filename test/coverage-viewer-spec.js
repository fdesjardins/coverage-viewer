/* global describe, it */

const assert = require('chai').assert
const coverageViewer = require('../index')

const fixture = require('./fixtures/coverage.json')

describe('coverage-viewer', () => {
  it('should exist', done => {
    assert(coverageViewer !== undefined)
    done()
  })
})
