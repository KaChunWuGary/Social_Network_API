const express = require('express');
const db = require('./config/connection');
const routes = require('./controllers');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);


//not sure if this part is correct, also, do I need to import mongoose here or later, since in sequelize, it needed to sync
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`);
  });
});
