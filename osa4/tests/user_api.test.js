const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('new user saved to db', async () => {
    const newUser = {
        username: 'test_user',
        password: 'test_password',
        name: 'test_name'
    }

    const postResponse = await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    await api.delete('/api/blogs/'+postResponse.body.id).expect(204)
}, 100000)

test('new user with invalid username not saved to db', async () => {
    const newUser = {
        username: 'TU',
        password: 'test_password',
        name: 'test_name'
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
}, 100000)

test('new user with invalid password not saved to db', async () => {
    const newUser = {
        username: 'Test_User_1',
        password: 'TP',
        name: 'test_name'
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
}, 100000)

test('new user with not unoque name not saved to db', async () => {
    const newUser = {
        username: 'test_user',
        password: 'test_password',
        name: 'test_name'
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
}, 100000)

afterAll(() => {
    mongoose.connection.close()
})