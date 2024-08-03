const express = require('express');
const path =  require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const restaurantRoutes = require('./routes/restaurant');
const reservationRoutes = require('./routes/reservation');
const orderRoutes = require('./routes/order');
const userRoutes = require('./routes/user');
const chatRoute = require('./routes/chat');

const app = express();
app.use(bodyParser.json());

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error' , (err)=>{
    console.log(err);
});

db.once('open' , ()=>{
    console.log('database is connected');
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/chat', chatRoute); //

app.use('/api/restaurants', restaurantRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});