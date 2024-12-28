import { test, describe } from 'node:test'
import { strictEqual } from 'node:assert'
import { list_helper } from '../utils/list_helper.js'

test('list_helper returns one', () => {
  const blogs = []
  const result = list_helper(blogs)
  strictEqual(result, 1)
})