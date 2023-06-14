require('dotenv').config();
const client = require('./setup');
const mongoose = require('mongoose');

const seedChecklist = async () => {

    await client();
    console.log('Awaiting Seed 🌱');

    const usersCollection = mongoose.connection.collection('checklists');
    await usersCollection.deleteMany();
    await usersCollection.insertOne(
      { user_id: '64883c4f14e17d87f2d01fb7', title: 'Seeded Checklist', content: 'This is a checklist', isCompleted: false}
    );

    console.log('DB Seeded 🌾');
    mongoose.connection.close();
};

seedChecklist();