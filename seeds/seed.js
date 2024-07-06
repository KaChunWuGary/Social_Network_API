const connection = require('../config/connection');
const Users = require ('./User');
const Thoughts = require ('./Thought');
const {User,Thought} = require ('../models');

connection.on('error', (err) => err.message);

connection.once('open', async () => {
  console.log('connected');
    // Delete the collections if they exist
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
      await connection.dropCollection('users');
    }

    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
      await connection.dropCollection('thoughts');
    }

    const userData = await User.insertMany(Users);
    const thoughtData =await Thought.insertMany(Thoughts);


  console.log(userData);
  console.log(thoughtData);

  console.info('Seeding complete! 🌱');
  process.exit(0);
});