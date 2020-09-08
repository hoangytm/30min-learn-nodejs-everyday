const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authenRoutes');
const cookieParser = require('cookie-parser');
const {requireAuth, checkUser} = require('./middleware/middleware');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://test:phanngochoang@cluster0.xh4da.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then((result) => {
        app.listen(3000);
        console.log("app is running...")
    })
    .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);