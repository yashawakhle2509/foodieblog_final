import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BlogPage.css'; // Import your CSS file

function BlogPage() {
    const [blogs, setBlogs] = useState([]);

    // Fetch all blogs when the component mounts
    useEffect(() => {
        async function fetchBlogs() {
            try {
                const response = await axios.get('http://localhost:3001/api/blogs'); // Replace with your actual API endpoint
                setBlogs(response.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        }

        fetchBlogs();
    }, []);

    return (
        <div className="blog-container">
            <h2>All Blogs</h2>
            <div className="blog-list">
                {blogs.map((blog) => (
                    <div className="blog-box" key={blog._id}>
                        <h3>{blog.title}</h3>
                        <p className="blog-details">
                            <span>Author: {blog.author}</span>
                            
                        </p>
                        <p>{blog.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BlogPage;
