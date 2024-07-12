const mongoose = require('mongoose');
const Userdata=require('./user.model')
const blogSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    longDescription: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Userdata, // Reference to the Registeruser model
        required: true}
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;