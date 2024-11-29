const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('Dummys', () => {
  test('dummy returns one', () => {
    const blogs = [1]

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })
})