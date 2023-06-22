const mongoose = require('mongoose');
const quotes = require("../quotes.json");
require('dotenv').config();
const client = require('./setup');

const seedQuotes = async () => {
    await client();
    console.log('Awaiting Seed 🌱');

    const quotesCollection = mongoose.connection.collection('quotes');
    // await quotesCollection.deleteMany();

    const quotesDocument = { quotes };
    await quotesCollection.insertOne(quotesDocument);

    console.log('DB Seeded 🌾');
    mongoose.connection.close();
};

seedQuotes();


