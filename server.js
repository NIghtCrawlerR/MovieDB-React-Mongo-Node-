const isProduction = process.env.NODE_ENV === 'production';
if (!isProduction) {
    require('dotenv').config()
}

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 4000;
const path = require('path')
const session = require('express-session')

const dbUrl = process.env.DB_URI

//Middleware
app.use(cors());
app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cookieParser())

//session
app.use(session(
    {
        secret: 'ssshhhhh',
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 60000,
            expires: new Date(Date.now() + (30 * 86400 * 1000)),
        },
    }
));


//Connect database
mongoose.connect(dbUrl, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function () {
    // bot.sendMessage('message')
    console.log("MongoDB successfully connected");
})

//Models & routes
require('./models/user.model')

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(require('./routes/index'));


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});

