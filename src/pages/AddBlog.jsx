import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBlog = () => {
  const [formData, setFormData] = useState({
    image: null,
    title: '',
    publish_date: '',
    categories: []
});
const [errors, setErrors] = useState({});
const [showModal, setShowModal] = useState(false);
const navigate = useNavigate();

useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('blogFormData'));
    if (savedData) setFormData(savedData);
}, []);

useEffect(() => {
    localStorage.setItem('blogFormData', JSON.stringify(formData));
}, [formData]);

const validateInput = (name, value) => {
    let newErrors = { ...errors };
    switch (name) {
        case 'title':
            if (value.length < 2) {
                newErrors.title = 'Title must be at least 2 characters long.';
            } else {
                delete newErrors.title;
            }
            break;
        default:
            break;
    }
    setErrors(newErrors);
};

const handleInputChange = (e) => {
    const { name, value } = e.target;
    validateInput(name, value);
    setFormData({ ...formData, [name]: value });
};

const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
};

const handleCategoryChange = (e) => {
    const selectedCategories = Array.from(e.target.selectedOptions, option => option.value);
    setFormData({ ...formData, categories: selectedCategories });
};

const isFormValid = () => {
    return Object.keys(errors).length === 0;
};

const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
        alert("Please correct the errors in the form.");
        return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('image', formData.image, formData.image.name);
    formDataToSend.append('publish_date', formData.publish_date);
    formDataToSend.append('categories', JSON.stringify(formData.categories));
    formDataToSend.append('description', 'description');
    formDataToSend.append('author', 'გელა გელაშვილი');
    formDataToSend.append('email', 'gigagiorgadze@redberry.ge');

    const token = import.meta.env.VITE_TOKEN

    try {
        const response = await axios.post('https://api.blog.redberryinternship.ge/api/blogs', formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            }
        });
        console.log(response);
        setShowModal(true);
        setFormData({ image: null, title: '', publish_date: '', categories: [] });
        localStorage.removeItem('blogFormData');
        navigate('/');
    } catch (error) {
        console.error(error);
    }
};

return (
    <form onSubmit={handleSubmit}>
        <div>
            <label>Image:</label>
            <input type="file" name="image" onChange={handleFileChange} required />
        </div>
        <div>
            <label>Title:</label>
            <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
            {errors.title && <span style={{ color: 'red' }}>{errors.title}</span>}
        </div>
        <div>
            <label>Publish Date:</label>
            <input type="date" name="publish_date" value={formData.publish_date} onChange={handleInputChange} required />
        </div>
        <div>
            <label>Category:</label>
            <select multiple name="categories" value={formData.categories} onChange={handleCategoryChange} required>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>
        <button type="submit">Submit</button>

        {showModal && (
            <div>
                <p>Blog post submitted successfully!</p>
                <button onClick={() => setShowModal(false)}>Close</button>
            </div>
        )}
    </form>
);
};

export default AddBlog