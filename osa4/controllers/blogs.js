const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user')
    response.json(blogs)
})

blogRouter.get('/:id', async (request, response, next) => {
    try{
        const blog = await Blog.findById(request.params.id)
        if (blog) {
            response.json(blog)
        } else {
            response.status(404).end()
        }
    }
    catch(ex)
    {
        next(ex)
    }
})

blogRouter.post('/', async (request, response, next) => {
    const body = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    try
    {
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes ? Number(body.likes) : 0,
            user: user._id
        })
        console.log(blog)
        if(!body.title || !body.url)
        {
            response.status(400).end()
        }
        else
        {
            const savedBlog = await blog.save()
            user.blogs = user.blogs.concat(savedBlog._id)
            await User.findByIdAndUpdate(user.id, user, { new: true })
            response.json(savedBlog)
        }
    }
    catch(ex)
    {
        next(ex)
    }
})

blogRouter.delete('/:id', async (request, response, next) => {
    try
    {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    }
    catch(ex)
    {
        next(ex)
    }
})

blogRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: Number(body.likes)
    }

    try
    {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        response.json(updatedBlog)
    }
    catch(ex)
    {
        next(ex)
    }
})

module.exports = blogRouter