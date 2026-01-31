const Book = require('../models/book.model');

class BookService {
    /**
     * Create a new book
     * @param {Object} data 
     * @returns {Promise<Book>}
     */
    async createBook(data) {
        const book = new Book(data);
        return await book.save();
    }

    /**
     * Delete a book by ID
     * @param {string} id
     * @returns {Promise<Book|null>}
     */
    async deleteBook(id) {
        return await Book.findByIdAndDelete(id);
    }

    /**
     * Get books with filtering, search, sorting and pagination
     * @param {Object} params - Query parameters 
     * @returns {Promise<Object>} - { books, total, pages }
     */
    async getBooks(params) {
        const {
            search,
            author,
            from,
            to,
            sort,
            page = 1,
            limit = 10
        } = params;

        // Build the query object
        const query = {};

        // 1. Search (Name/Description - Substring, Case-insensitive)
        if (search) {
            const searchRegex = new RegExp(search, 'i');
            query.$or = [
                { name: searchRegex },
                { description: searchRegex }
            ];
        }

        // 2. Filter by Author (Case-insensitive exact match)
        // Note: To do strictly "case-insensitive exact match", regex with ^$ is best 
        // since we stored it as plain string.
        if (author) {
            query.author = new RegExp(`^${author}$`, 'i');
        }

        // 3. Filter by Publish Date Range
        if (from || to) {
            query.publishDate = {};
            if (from) query.publishDate.$gte = new Date(from);
            if (to) query.publishDate.$lte = new Date(to);
        }

        // Pagination Calculation
        // Ensure limit is within max 50
        const limitNum = Math.min(parseInt(limit), 50);
        const pageNum = parseInt(page);
        const skip = (pageNum - 1) * limitNum;

        // Sorting
        // Default sort could be creation time or name. Let's default to create time desc.
        let sortOptions = { createdAt: -1 };

        if (sort) {
            // expected format: 'name' (asc) or '-name' (desc)
            const sortField = sort.startsWith('-') ? sort.substring(1) : sort;
            const sortOrder = sort.startsWith('-') ? -1 : 1;

            // Allowed sort fields
            if (['name', 'author', 'publishDate'].includes(sortField)) {
                sortOptions = { [sortField]: sortOrder };
            }
        }

        // Execute Query
        // We execute countDocuments and find in parallel for performance
        const [books, total] = await Promise.all([
            Book.find(query)
                .collation({ locale: 'en' }) // Helps with case-insensitive sorting if needed, but standard sort is usually fine
                .sort(sortOptions)
                .skip(skip)
                .limit(limitNum),
            Book.countDocuments(query)
        ]);

        return {
            data: books,
            meta: {
                total,
                page: pageNum,
                limit: limitNum,
                totalPages: Math.ceil(total / limitNum)
            }
        };
    }
}

module.exports = new BookService();
