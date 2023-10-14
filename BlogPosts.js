import React, { useState, useEffect } from 'react';
import './BlogPosts.css'; // You can create a BlogPosts.css file for styling
import axios from 'axios';
import { useAuth } from './AuthContext'; // Import the useAuth hook

function BlogPosts() {
    const { username } = useAuth(); // Get the username from the AuthContext
    const [blogs, setBlogs] = useState([]);
    const [newBlog, setNewBlog] = useState({ title: '', content: '' });

    useEffect(() => {
        // Fetch existing blog posts for the logged-in user (where author matches the username)
        axios.get(`http://localhost:3001/api/blogposts?author=${username}`) // Adjust the API endpoint as needed
            .then((response) => {
                setBlogs(response.data);
            })
            .catch((error) => {
                console.error('Error fetching blog posts:', error);
            });
    }, [username]); // Include 'username' in the dependency array

    const handleBlogCreate = () => {
        // Send a POST request to create a new blog post with the author's username
        axios.post('http://localhost:3001/api/blogposts', { ...newBlog, author: username }) // Adjust the API endpoint as needed
            .then((response) => {
                setBlogs([...blogs, response.data]); // Add the new blog to the list
                setNewBlog({ title: '', content: '' }); // Clear the form
            })
            .catch((error) => {
                console.error('Error creating a blog post:', error);
            });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewBlog({ ...newBlog, [name]: value });
    };

    return (
        <div className="blog-posts">
            <h2>My Blog Posts</h2>
            <div className="create-blog">
                <h3>Create a New Blog</h3>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={newBlog.title}
                    onChange={handleInputChange}
                />
                <textarea
                    name="content"
                    placeholder="Blog Content"
                    value={newBlog.content}
                    onChange={handleInputChange}
                />
                <button onClick={handleBlogCreate}>Create</button>
            </div>
            <h3>My Existing Blog Posts</h3>
            {blogs.map((blog) => (
                <div key={blog.id} className="blog-post">
                    <h4>{blog.title}</h4>
                    <p>{blog.content}</p>
                </div>
            ))}
        </div>
    );
}

export default BlogPosts;
