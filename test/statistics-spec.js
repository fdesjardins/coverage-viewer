/* global describe, it */

const assert = require('chai').assert
const stats = require('../lib/statistics')
const transforms = require('../lib/transforms')

const fixture = require('./fixtures/coverage.json')

describe('statistics', () => {
  it('should getLineStats', () => {
    const transformed = transforms.json(fixture)
    const results = stats.getLineStats(transformed)
    assert(results.lines, results.hit + results.missed)
  })
})
