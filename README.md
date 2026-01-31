# Books API

A production-ready Node.js REST API for managing a library of books. Built with Express and MongoDB, featuring a clean layered architecture, advanced search/filtering, and comprehensive clean code practices.

## 🚀 Features

- **Create Books**: Add new books with validation.
- **Advanced Search**: Search by name or description (partial matching).
- **Filtering**: Filter by author.
- **Date Range**: Filter books by publication date (`from` / `to`).
- **Sorting**: Sort by name, author, or date (ascending/descending).
- **Pagination**: Efficient data retrieval with `page` and `limit`.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Architecture**: Layered (Controller -> Service -> Data Access)

## 📦 Installation & Setup

1.  **Clone the repository** (if you haven't already).
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Configuration**:
    The app uses specific defaults, but you can configure a `.env` file in the root:
    ```env
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/books-api
    ```
    *Note: A default `.env` is included for convenience.*

4.  **Database Seeding** (Optional):
    Populate the database with dummy data:
    ```bash
    npm run seed
    ```

5.  **Run the Server**:
    - **Development Mode** (with Nodemon):
        ```bash
        npm run dev
        ```
    - **Production Mode**:
        ```bash
        npm start
        ```

## 🔌 API Endpoints

Base URL: `http://localhost:3000`

### 1. Create a Book
**POST** `/books`

**Body**:
```json
{
  "name": "Clean Code",
  "description": "A Handbook of Agile Software Craftsmanship",
  "author": "Robert C. Martin",
  "publishDate": "2008-08-01"
}
```

### 2. Explore Books (Search/Filter)
**GET** `/books`

| Query Param | Description | Example |
| :--- | :--- | :--- |
| `search` | Partial match on Name or Description | `?search=harry` |
| `author` | Exact match (case-insensitive) | `?author=j.k. rowling` |
| `from` | Start date (inclusive) | `?from=2000-01-01` |
| `to` | End date (inclusive) | `?to=2010-12-31` |
| `sort` | Field to sort by. Use `-` for desc | `?sort=-publishDate` |
| `page` | Page number (default 1) | `?page=2` |
| `limit` | Items per page (default 10) | `?limit=5` |

**Examples**:
- **Search**: `GET /books?search=potter`
- **Filter**: `GET /books?author=George%20Orwell`
- **Range & Sort**: `GET /books?from=1990-01-01&sort=-publishDate`
- **Pagination**: `GET /books?page=2&limit=5`

### 3. Delete a Book
**DELETE** `/books/:id`

**Response**:
```json
{
  "message": "Book deleted successfully"
}
```

## 🧪 Testing

1.  Ensure MongoDB is running.
2.  Run `npm run seed` to load data.
3.  Use Postman or curl to test the endpoints.

## 📂 Project Structure

```
src/
├── config/         # Database configuration
├── controllers/    # Request handlers (HTTP layer)
├── models/         # Mongoose Schemas (Data layer)
├── routes/         # Route definitions
├── services/       # Business logic (Service layer)
└── app.js          # App setup (Middleware)
scripts/
└── seed.js         # Data seeding script
server.js           # Entry point
```
