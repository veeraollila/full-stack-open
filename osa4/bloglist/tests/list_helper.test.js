import { test, describe } from 'node:test'
import { strictEqual } from 'node:assert'
import { dummy, totalLikes } from '../utils/list_helper.js'

describe('list_helper tests', () => {
    test('dummy returns one', () => {
        const blogs = []
        const result = dummy(blogs)
        strictEqual(result, 1)
    })
    test('totalLikes returns the total likes of all blogs', () => {
        const blogs = [
            { title: 'Blog 1', likes: 5 },
            { title: 'Blog 2', likes: 10 },
            { title: 'Blog 3', likes: 15 },
        ]
        const result = totalLikes(blogs)
        strictEqual(result, 30)
    })
})