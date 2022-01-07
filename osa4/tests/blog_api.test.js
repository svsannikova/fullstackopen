const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(2)
}, 100000)

test('there is id property defined', async () => {
    const response = await api.get('/api/blogs/61d6c2363d437befc700d804')
    expect(response.body.id).toBeDefined()
}, 100000)

test('post saves blog to db', async () => {
    const newBlog = {
        title: 'test Blog',
        author: 'test author',
        url: 'test url',
        likes: 999
    }

    const postResponse = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(3)

    await api.delete('/api/blogs/'+postResponse.body.id).expect(204)
}, 100000)

test('post missing likes to 0', async () => {
    const newBlog = {
        title: 'test Blog',
        author: 'test author',
        url: 'test url'
    }

    const postResponse = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(postResponse.body.likes).toBe(0)
    await api.delete('/api/blogs/'+postResponse.body.id).expect(204)
}, 100000)

test('post missing url cause error', async () => {
    const newBlog = {
        title: 'test Blog',
        author: 'test author'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
}, 100000)

afterAll(() => {
    mongoose.connection.close()
})