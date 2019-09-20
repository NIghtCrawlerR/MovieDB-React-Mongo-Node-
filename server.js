require('dotenv').config()

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 4000;
const routes = require('./routes/routes')
// const routesUser = require('./routes/user')
const path = require('path')
const session = require('express-session')
const errorHandler = require('errorhandler')

const isProduction = process.env.NODE_ENV === 'production';

const dbUrl = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds155714.mlab.com:55714/movies`

//Middleware
app.use(cors());
app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cookieParser())

//session
app.use(session({secret: 'ssshhhhh'}));

//Connect database
mongoose.connect(dbUrl, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB successfully connected");
})

if (!isProduction) {
    app.use(errorHandler());
}

//Models & routes
require('./models/user.model')
// require('./config/passport')

app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/movies', routes);
// app.use('/user', routesUser);
app.use(require('./routes/index'));

//Error handlers & middlewares
if (!isProduction) {
    app.use((err, req, res) => {
        res.status(err.status || 500);

        res.json({
            errors: {
                message: err.message,
                error: err,
            },
        });
    });
}

app.use((err, req, res) => {
    res.status(err.status || 500);

    res.json({
        errors: {
            message: err.message,
            error: {},
        },
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});

