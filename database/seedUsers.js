require('dotenv').config();
const client = require('./setup');
const mongoose = require('mongoose');

const seedUsers = async () => {

    await client();
    console.log('Awaiting Seed 🌱');

    const usersCollection = mongoose.connection.collection('user');
    await usersCollection.deleteMany();
    await usersCollection.insertOne(
      { username: 'a', password: '123' }
    );

    console.log('DB Seeded 🌾');
    mongoose.connection.close();
};

seedUsers();
