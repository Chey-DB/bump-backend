require('dotenv').config();
const client = require('./setup');
const mongoose = require('mongoose');

const seedUsers = async () => {

    await client();
    console.log('Awaiting Seed 🌱');

    const usersCollection = mongoose.connection.collection('users');
    await usersCollection.deleteMany();
    await usersCollection.insertMany([
      { username: 'a', password: '123' },
      { username: 'b', password: 'b' },
      { username: 'c', password: 'c' },
    ]);

    console.log('DB Seeded 🌾');
    mongoose.connection.close();
};

seedUsers();