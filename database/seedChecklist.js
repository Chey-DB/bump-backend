require('dotenv').config();
const client = require('./setup');
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types

const seedChecklist = async () => {
  await client();
  console.log('Awaiting Seed 🌱');

  const usersCollection = mongoose.connection.collection('checklists');
  await usersCollection.deleteMany();
  await usersCollection.insertMany([
    { user_id: new ObjectId('6488473bfa7d92ab51dfef3f'), title: 'Get a cot', content: 'This is a checklist', isCompleted: false },
    { user_id: new ObjectId('6488473bfa7d92ab51dfef3f'), title: 'Buy Diapers', content: 'This is a checklist', isCompleted: false },
    { user_id: new ObjectId('6488473bfa7d92ab51dfef3f'), title: 'Get little shoes', content: 'This is a checklist', isCompleted: false },
    { user_id: new ObjectId('6488473bfa7d92ab51dfef3f'), title: 'Get bottles', content: 'This is a checklist', isCompleted: false },
    { user_id: new ObjectId('6488473bfa7d92ab51dfef41'), title: 'Pick a name', content: 'This is a checklist', isCompleted: false},
    { user_id: new ObjectId('6488473bfa7d92ab51dfef41'), title: 'Pick a nursery colour', content: 'This is a checklist', isCompleted: false}
  ]);

  console.log('DB Seeded 🌾');
  mongoose.connection.close();
};

seedChecklist();


