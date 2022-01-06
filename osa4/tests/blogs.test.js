const dummy = require('../utils/list_helper').dummy
const sumOfLikes = require('../utils/list_helper').sumOfLikes
const favoriteBlog = require('../utils/list_helper').favoriteBlog

describe('dymmy case', () => {
    test('of dummy case', () => {
        expect(dummy()).toBe(1)
    })

    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    test('when list has only one blog, equals the likes of that', () => {
        const result = sumOfLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    const listWithManyBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f9',
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 12,
            __v: 0
        }
    ]

    const favorite = {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 12
    }

    test('get blog with the most amount of likes', () => {
        const result = favoriteBlog(listWithManyBlogs)
        expect(result).toEqual(favorite)
    })

})