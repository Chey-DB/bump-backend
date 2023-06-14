require('dotenv').config();
const client = require('./setup');
const mongoose = require('mongoose');

const seedJournals = async () => {

    await client();
    console.log('Awaiting Seed 🌱');

    const usersCollection = mongoose.connection.collection('journals');
    await usersCollection.deleteMany();
    await usersCollection.insertMany([
      { user_id: '6488473bfa7d92ab51dfef3f', title: 'Updated Entry 1', content: 'Updated content 1', createdOn: 'date', 
        mood: ['excited', 'calm'], symptoms: ['headache', 'insomnia'] },
      { user_id: '6488473bfa7d92ab51dfef3f', title: 'Updated Entry 2', content: 'Updated content 2', createdOn: 'date', 
        mood: ['excited', 'calm'], symptoms: ['headache', 'insomnia'] },
      { user_id: '6488473bfa7d92ab51dfef40', title: 'Updated Entry 3', content: 'Updated content 3', createdOn: 'date', 
        mood: ['excited', 'calm'], symptoms: ['headache', 'insomnia'] },
      { user_id: '6488473bfa7d92ab51dfef40', title: 'Updated Entry 4', content: 'Updated content 4', createdOn: 'date', 
        mood: ['excited', 'calm'], symptoms: ['headache', 'insomnia'] },
      { user_id: '6488473bfa7d92ab51dfef41', title: 'Updated Entry 5', content: 'Updated content 5', createdOn: 'date', 
        mood: ['excited', 'calm'], symptoms: ['headache', 'insomnia'] }
    ]);    

    console.log('DB Seeded 🌾');
    mongoose.connection.close();
};

seedJournals();
