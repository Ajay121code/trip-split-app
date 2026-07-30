const {mongoClient} = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI || 'mongodb+srv://ajaysinghtomer121:g11LFdQ4fwgnjAyI@cluster0.63lmhge.mongodb.net/?appName=Cluster0';
const client = new mongoClient(uri);
let db;

async function connectDB() {
    if (db) {
        return db;
    }
    await client.connect();
    db = client.db('admin');
    console.log('Connected to MongoDB');
    return db;
}

function getDB() {
    if (!db) {
        throw new Error('Database not connected. Call connectDB() first.');
    }
    return db;
}

module.exports = { connectDB, getDB };