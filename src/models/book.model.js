const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Book name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        maxlength: [2000, 'Description cannot be more than 2000 characters']
    },
    author: {
        type: String,
        required: [true, 'Author name is required'],
        trim: true,
        index: true // Index for exact match filtering
    },
    publishDate: {
        type: Date,
        index: true // Index for range filtering and sorting
    }
}, {
    timestamps: true // Adds createdAt and updatedAt
});

// Text index for search functionality (weighted to favor name matches)
bookSchema.index(
    { name: 'text', description: 'text' },
    { weights: { name: 10, description: 5 } }
);

module.exports = mongoose.model('Book', bookSchema);
