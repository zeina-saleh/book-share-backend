const mongoose = require('mongoose')
const booksSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }],
    image: String,
    review: String
},{timestamps: true})

const usersSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    book: [booksSchema],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
})
const model = mongoose.model('User', usersSchema);
module.exports = model;
