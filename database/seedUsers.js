require('dotenv').config();
const client = require('./setup');
const mongoose = require('mongoose');

const seedUsers = async () => {

    await client();
    console.log('Awaiting Seed 🌱');

    const usersCollection = mongoose.connection.collection('users');
    await usersCollection.deleteMany();
    await usersCollection.insertMany([
      {username: 'dave', password: '123' },
      {username: 'bella', password: '123' },
      {username: 'adam', password: '123' }
    ]);

    console.log('DB Seeded 🌾');
    mongoose.connection.close();
};

seedUsers();
