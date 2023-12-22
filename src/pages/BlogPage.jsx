import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Header from '../components/header/Header'

const BlogPage = () => {
    const [blogs, setBlogs] = useState(null)
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const token = import.meta.env.VITE_TOKEN
                const response = await axios.get('https://api.blog.redberryinternship.ge/api/blogs', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBlogs(response.data)
                console.log(response.data)
            } catch (error) {
                console.log(error)
                setError('Error fetching data');
            }
        }
        fetchBlogs()
    }, [])

    return (
        <div>
            <Header />
        </div>
    )
}

export default BlogPage