// const { mongoose } = require('mongoose')
const { MongoClient } = require('mongodb')

const uri = 'mongodb://localhost:27017/libery'
const client = new MongoClient(uri)

// Sample book data
const books = [
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    published_year: 1960,
    price: 12.99,
    in_stock: true,
    pages: 336,
    publisher: 'J. B. Lippincott & Co.'
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    published_year: 1949,
    price: 10.99,
    in_stock: true,
    pages: 328,
    publisher: 'Secker & Warburg'
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    published_year: 1925,
    price: 9.99,
    in_stock: true,
    pages: 180,
    publisher: 'Charles Scribner\'s Sons'
  },
  {
    title: 'Brave New World',
    author: 'Aldous Huxley',
    genre: 'Dystopian',
    published_year: 1932,
    price: 11.50,
    in_stock: false,
    pages: 311,
    publisher: 'Chatto & Windus'
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1937,
    price: 14.99,
    in_stock: true,
    pages: 310,
    publisher: 'George Allen & Unwin'
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    genre: 'Fiction',
    published_year: 1951,
    price: 8.99,
    in_stock: true,
    pages: 224,
    publisher: 'Little, Brown and Company'
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    published_year: 1813,
    price: 7.99,
    in_stock: true,
    pages: 432,
    publisher: 'T. Egerton, Whitehall'
  },
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1954,
    price: 19.99,
    in_stock: true,
    pages: 1178,
    publisher: 'Allen & Unwin'
  },
  {
    title: 'Animal Farm',
    author: 'George Orwell',
    genre: 'Political Satire',
    published_year: 1945,
    price: 8.50,
    in_stock: false,
    pages: 112,
    publisher: 'Secker & Warburg'
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    genre: 'Fiction',
    published_year: 1988,
    price: 10.99,
    in_stock: true,
    pages: 197,
    publisher: 'HarperOne'
  },
]


// ========================= task 1 ========================= //
async function task1() {
    try {
        // connect to Mongodb server
        await client.connect();
        console.log("Mogodb connected successfully");

        // create plp_bookstore db
        const db = client.db('plp_bookstore');
        console.log("created plp_bookstore database successfully")

        // create books collection
        const collection = await db.createCollection('books')
        console.log(`Successfully created ${collection.collectionName} collection`)
    } catch(err) {
        console.error("Error creating collection: ", err)
    } finally {
        await client.close()
    }
}
// task1()


// ========================= task 2 ========================= //
async function task2() {
    try {
        // connect to Mongodb server
        await client.connect();
        console.log("Connected to mongoDb server");

        // get db and collection
        const db = client.db('plp_bookstore');
        const collection = db.collection('books');

        // insert books into collection
        const result = await collection.insertMany(books);
        console.log(`${result.insertedCount} books was added to collection`);

        // find all books in a specific genre (Fiction)
        const fictionBooks = await collection.find(
            { genre: "Fiction" }
        ).toArray();
        console.log("Fiction books: ", fictionBooks)

        // Find books published after a certain year
        const certainYear = await collection.find(
            { published_year: { $gt: 1950 } }
        ).toArray();
        console.log(`Books published after ${1950}: `, certainYear)

        // Find books by a specific author
        const specificAuthor = await collection.find({ author: "Jane Austen" }).toArray()
        console.log("Specific Author name: ", specificAuthor)

        // Update the price of a specific book
        await collection.updateOne(
            { title: "Animal Farm" },
            { $set: { price: 20.00 } }
        )
        console.log(`Animal Farm price has been changed from 8.50 to 20.00`)

        // Delete a book by its title
        await collection.deleteOne({ title: "The Hobbit" })
        console.log("The Hobbit deleted successfull")

    } catch (err) {
        console.error("Error ", err)
    } finally {
        await client.close()
    }
}
// task2()


// ========================= task 3 ========================= //
async function task3() {
    try {
        // connect to mongodb server
        await client.connect()
        console.log("Connected to mongoDb server");

        // get db and collection
        const db = client.db('plp_bookstore');
        const collection = db.collection('books');

        // Write a query to find books that are both in stock and published after 2010
        const books = await collection.find({
            in_stock: true,
            published_year: { $gt: 2010 }
        }).toArray()
        console.log("books published after 2010: ", books)

        // Use projection to return only the title, author, and price fields in your queries
        const projection = await collection.aggregate([
            {$project: {
                _id: 0,
                title: 1,
                author: 1,
                price: 1
            }}
        ]).toArray()
        console.log(projection)

        // Implement sorting to display books by price (both ascending and descending)
        const sortingBook = await collection.find().sort({ price: -1 }).toArray();
        console.log("Sort books price by [Low -> high]: ", sortingBook);

        // Use the `limit` and `skip` methods to implement pagination (5 books per page)
        const limit = 5;
        const page = 1;
        const skip = (page - 1) * limit;
        const pagination = await collection.find().skip(skip).limit(limit).toArray();
        console.log("Pagination section: ", pagination)
    } catch (err) {
        console.log("Error: ", err);
    } finally {
        // disconnect mongodb server
        await client.close();
    }
}
// task3()


// ========================= task 4 ========================= //
async function task4() {
    try {
        // connect to mongodb server
        await client.connect();
        console.log("Connected to mongoDb server");

        // get db and collection
        const db = client.db('plp_bookstore');
        const collection = db.collection('books');

        // Create an aggregation pipeline to calculate the average price of books by genre
        const averagePrice = await collection.aggregate([
            {$group: {
                _id: "$genre",
                totalPrice: { $avg: "$price" }
            }}
        ]).toArray();
        console.log("Avegrage Price of each genre: ", averagePrice)

        // Create an aggregation pipeline to find the author with the most books in the collection
        const maxBookByAuthor = await collection.aggregate([
            {
                $group: {
                    _id: "$author",
                    totalBooks: { $sum: 1 }
                },
            },
            { $sort: { totalBooks: -1 } }, 
            { $limit: 1 }
        ]).toArray()
        console.log("Author with the highest book in collection: ", maxBookByAuthor)

        // Implement a pipeline that groups books by publication decade and counts them
        const groupByBookPublish = await collection.aggregate([
            // Calculate the decade year from published_year
            {
                $project: {
                    decade: {
                        $multiply: [
                            { $floor: { $divide: ["$published_year", 10] } },
                            10
                        ]
                    }
                }
            },
            {
                // Grade by decade and count how many books in each
                $group: {
                    _id: "$decade",
                    totalBooks: { $sum: 1 }
                }
            },
            {
                // sort by decade (ascending)
                $sort: { _id: 1 }
            }
        ]).toArray()
        console.log("Publication by decade: ", groupByBookPublish)

    } catch (err) {
        console.error("Error: ", err)
    } finally {
        // disconnect from mongodb server
        await client.close();
    }
}
// task4()


// ========================= task 5 ========================= //
async function task5() {
    try {
        // connect to mongodb server
        await client.connect()
        console.log("Connected to mongoDb server");

        // get db and collection
        const db = client.db('plp_bookstore');
        const collection = db.collection('books');

        // Create an index on the `title` field for faster searches
        const titleSearches = await collection.find({title: "To Kill a Mockingbird"}).toArray()
        console.log("Index search on title field: ", titleSearches)

        // Create a compound index on `author` and `published_year`
        const author_publish_year = await collection.findOne({ author: "The Great Gatsby", published_year: 1925 })
        console.log("Author and publish year: ", author_publish_year)

        // Use the `explain()` method to demonstrate the performance improvement with your indexes
        const result = await collection.find({ title: "To Kill a Mockingbird" }).explain("executionStats");
        console.log(result)
    } catch (err) {
        console.error("Error: ", err)
    } finally {
        // disconnect from mongodb server
        await client.close()
    }
}
// task5()