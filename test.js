/* global describe, it */

const assert = require('chai').assert
const nm = require('./index')

describe('coverage-viewer', () => {
  it('should exist', done => {
    assert(nm !== undefined)
    done()
  })
})
