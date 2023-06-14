require('dotenv').config();
const client = require('./setup');
const mongoose = require('mongoose');

const seedJournals = async () => {

    await client();
    console.log('Awaiting Seed 🌱');

    const usersCollection = mongoose.connection.collection('journals');
    await usersCollection.deleteMany();
    await usersCollection.insertOne(
      { user_id: '64883c4f14e17d87f2d01fb6', title: 'New Entry', content: 'My first entry', createdOn:'date', 
        mood:['happy', 'nervous'], symptoms:['nausea', 'fatigue']}
    );

    console.log('DB Seeded 🌾');
    mongoose.connection.close();
};

seedJournals();
