const dummy = (blogs) => {
    return 1
}

const sumOfLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    let favorite = blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)

    return { title: favorite.title, author: favorite.author, likes: favorite.likes }
}

module.exports = {
    dummy,
    sumOfLikes,
    favoriteBlog
}