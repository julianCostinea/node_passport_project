const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

//DB Config
const db = require('./config/keys').MongoURI;

//Mongo Connect
mongoose.connect(db, {useNewUrlParser: true})
    .then(()=>console.log('MongoDB Connected...'))
    .catch(err=>console.log(err));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//bodyparser is now included in express
app.use(express.urlencoded({extended: false}));

//Routes
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');

app.use(indexRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));