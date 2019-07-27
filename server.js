const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 4000;
const routes = require('./routes/routes')
const path = require('path')

const dbUrl = 'mongodb://NightCrawler:F9V6U0XxMmOZEVeA@ds155714.mlab.com:55714/movies'

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(dbUrl, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB successfully connected");
})

app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/movies', routes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});

