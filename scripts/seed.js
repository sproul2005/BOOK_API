require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('../src/models/book.model');
const connectDB = require('../src/config/db');

const books = [
    {
        name: "The Great Gatsby",
        description: "A classic novel of the Roaring Twenties, exploring themes of decadence and idealism.",
        author: "F. Scott Fitzgerald",
        publishDate: "1925-04-10"
    },
    {
        name: "Harry Potter and the Sorcerer's Stone",
        description: "A young wizard discovers his magical heritage and attends Hogwarts.",
        author: "J.K. Rowling",
        publishDate: "1997-06-26"
    },
    {
        name: "Harry Potter and the Chamber of Secrets",
        description: "Harry returns to Hogwarts for his second year and faces a monster.",
        author: "J.K. Rowling",
        publishDate: "1998-07-02"
    },
    {
        name: "1984",
        description: "A dystopian novel set in a totalitarian society ruled by Big Brother.",
        author: "George Orwell",
        publishDate: "1949-06-08"
    },
    {
        name: "Animal Farm",
        description: "A satirical allegory about the Soviet Union using farm animals.",
        author: "George Orwell",
        publishDate: "1945-08-17"
    },
    {
        name: "The Hobbit",
        description: "Bilbo Baggins sets out on a quest to win a share of the treasure guarded by Smaug.",
        author: "J.R.R. Tolkien",
        publishDate: "1937-09-21"
    },
    {
        name: "The Fellowship of the Ring",
        description: "The first volume of The Lord of the Rings, concerning the One Ring.",
        author: "J.R.R. Tolkien",
        publishDate: "1954-07-29"
    },
    {
        name: "Pride and Prejudice",
        description: "A romantic novel of manners written by Jane Austen.",
        author: "Jane Austen",
        publishDate: "1813-01-28"
    },
    {
        name: "Effective Java",
        description: "A comprehensive guide to best practices in Java programming.",
        author: "Joshua Bloch",
        publishDate: "2017-12-27"
    },
    {
        name: "Clean Code",
        description: "A Handbook of Agile Software Craftsmanship.",
        author: "Robert C. Martin",
        publishDate: "2008-08-01"
    },
    {
        name: "The Pragmatic Programmer",
        description: "From Journeyman to Master, a book about software engineering.",
        author: "Andrew Hunt",
        publishDate: "1999-10-20"
    },
    {
        name: "Cracking the Coding Interview",
        description: "189 Programming Questions and Solutions.",
        author: "Gayle Laakmann McDowell",
        publishDate: "2015-07-01"
    },
    {
        name: "Design Patterns",
        description: "Elements of Reusable Object-Oriented Software.",
        author: "Erich Gamma",
        publishDate: "1994-10-21"
    },
    {
        name: "Refactoring",
        description: "Improving the Design of Existing Code.",
        author: "Martin Fowler",
        publishDate: "1999-07-08"
    },
    {
        name: "The C Programming Language",
        description: "The authoritative reference for C by generic developers.",
        author: "Brian W. Kernighan",
        publishDate: "1978-02-22"
    },
    {
        name: "Node.js Design Patterns",
        description: "Master best practices to build modular and scalable server-side web applications.",
        author: "Mario Casciaro",
        publishDate: "2020-07-29"
    }
];

const seedData = async () => {
    try {
        await connectDB();

        // Clear existing data
        await Book.deleteMany({});
        console.log('Data cleared...');

        // Insert new data
        await Book.insertMany(books);
        console.log('Data imported successfully!');

        process.exit();
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
};

seedData();
