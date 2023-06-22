const mongoose = require('mongoose');
const quotes = require("../quotes.json");

const indicesToRemove = [3, 16, 30, 36, 56, 60, 66, 79, 88, 102];
indicesToRemove.sort((a, b) => b - a); // Sort the indices in descending order

indicesToRemove.forEach(index => {
  quotes.splice(index, 1);
});

const quotesWithoutNumbers = quotes.map(quote => quote.replace(/^\d+\.\s*/, ''));

require('dotenv').config();
const client = require('./setup');

const seedQuotes = async () => {
    await client();
    console.log('Awaiting Seed 🌱');

    const quotesCollection = mongoose.connection.collection('quotes');
    await quotesCollection.deleteMany();

    const quotesDocument = { quotesWithoutNumbers };
    await quotesCollection.insertOne(quotesDocument);

    console.log('DB Seeded 🌾');
    mongoose.connection.close();
};

seedQuotes();


