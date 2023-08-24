const User = require('../models/users.model')

async function createReview(req, res) {
    try {
        const { title, author, image, reviewText } = req.body;
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const review = {
            title: title,
            author: author,
            image: image,
            review: reviewText,
        };
        user.book.push(review);
        await user.save();
        return res.status(201).json({ message: 'Review created successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}


const getAllReviews = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving users' });
    }
}

const likeReview = async (req, res) => {
    try {
        const userId = req.user._id;
        const { bookId } = req.body;
        const bookOwner = await User.findOne({ 'book._id': bookId });
        if (!bookOwner) {
            return res.status(404).json({ error: 'User who posted the book not found' });
        }
        const book = bookOwner.book.id(bookId);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        const userLiked = book.likes.includes(userId);
        if (userLiked) {
          book.likes.pull(userId);
          book.likes = book.likes.filter(likedUserId => likedUserId !== userId);
        } else {
            book.likes.push(userId);
        }
        await bookOwner.save();
        res.json({ message: userLiked ? 'Book disliked' : 'Book liked', book });
    } catch (error) {
        res.status(500).json({ error: 'Error updating like status' });
    }
};
module.exports = {createReview, getAllReviews, likeReview};