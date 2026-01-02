## 🗄️ Project Title
MongoDB – Data Layer Fundamentals and Advanced Techniques

## 📂 Database Details
Database name: `plp_bookstore`  
Collection name: `books`

Each document includes:
```json
{
  "title": "Book Title",
  "author": "Author Name",
  "genre": "Fiction",
  "published_year": 2015,
  "price": 20.99,
  "in_stock": true,
  "pages": 320,
  "publisher": "Publisher Name"
}
```

## 🧠 Features Implemented
- CRUD Operations (Create, Read, Update, Delete)
- Advanced Queries (filtering, projection, sorting)
- Aggregation Pipelines (average price, author with most books, decade grouping)
- Indexing and Performance Testing with `explain()`
- Pagination using `limit` and `skip`

## 🧪 How to Run
1. Install dependencies (if using Mongoose):
   ```bash
   npm install mongodb
   ```
2. Start MongoDB locally or connect to MongoDB Atlas.
3. Run the insert script:
   ```bash
   node insert_books.js
   ```
4. Run queries:
   ```bash
   node queries.js
   ```

## 👤 Author
Samuel Odusanwo  
Frontend Developer | Backend Engineer | MongoDB Enthusiast































<!-- ## Assignment Overview

This week focuses on MongoDB fundamentals including:
- Creating and connecting to MongoDB databases
- CRUD operations (Create, Read, Update, Delete)
- MongoDB queries and filters
- Aggregation pipelines
- Indexing for performance

## Submission

Complete all the exercises in this assignment and push your code to GitHub using the provided GitHub Classroom link.

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Install MongoDB locally or set up a MongoDB Atlas account
4. Run the provided `insert_books.js` script to populate your database
5. Complete the tasks in the assignment document

## Files Included

- `Week1-Assignment.md`: Detailed assignment instructions
- `insert_books.js`: Script to populate your MongoDB database with sample book data

## Requirements

- Node.js (v18 or higher)
- MongoDB (local installation or Atlas account)
- MongoDB Shell (mongosh) or MongoDB Compass

## Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [MongoDB University](https://university.mongodb.com/)
- [MongoDB Node.js Driver](https://mongodb.github.io/node-mongodb-native/)  -->