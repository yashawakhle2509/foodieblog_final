const Blog = require('../models/Blog');

// Create a new blog
async function createBlog(req, res) {
    try {
        const newBlog = new Blog(req.body);
        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    } catch (error) {
        console.error('Error creating blog:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Fetch all blogs
async function getAllBlogs(req, res) {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Fetch a blog by ID
async function getBlogById(req, res) {
    const { id } = req.params;
    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.json(blog);
    } catch (error) {
        console.error('Error fetching blog by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Update a blog by ID
async function updateBlog(req, res) {
    const { id } = req.params;
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.json(updatedBlog);
    } catch (error) {
        console.error('Error updating blog:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Delete a blog by ID
async function deleteBlog(req, res) {
    const { id } = req.params;
    try {
        const deletedBlog = await Blog.findByIdAndRemove(id);
        if (!deletedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.json(deletedBlog);
    } catch (error) {
        console.error('Error deleting blog:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function fetchBlogPosts(username) {
    try {
        // Use the 'username' to filter blog posts
        return await Blog.find({ author: username });
    } catch (error) {
        throw error;
    }
}

// Create a new blog post
async function createBlogPost({ title, content }) {
    try {
        const newBlog = new Blog({ title, content });
        await newBlog.save();
        return newBlog;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
    fetchBlogPosts,
    createBlogPost,
};
