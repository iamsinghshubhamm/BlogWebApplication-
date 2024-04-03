const mongoose = require('mongoose')
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    imageUrl: {
        type: String,
        required: [true, 'Image URL is required']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: String,
        required: [true, 'Date is required']
    },
    datetime: {
        type: String,
        required: [true, 'Datetime is required']
    },
    category: {
        title: {
            type: String,
            required: [true, 'Category title is required']
        },
        href: {
            type: String,
            required: [true, 'Category href is required']
        }
    },
    author: {
        name: {
            type: String,
            required: [true, 'Author name is required']
        },
        role: {
            type: String,
            default: '' // If role is not provided, it will default to an empty string
        },
        href: {
            type: String,
            default: '' // If href is not provided, it will default to an empty string
        },
        imageUrl: {
            type: String,
            required: [true, 'Author image URL is required']
        }
    }
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
