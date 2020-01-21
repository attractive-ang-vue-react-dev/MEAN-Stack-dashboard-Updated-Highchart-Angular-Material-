let express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    dataBaseConfig = require('./database/db'),
    createError = require('http-errors');

//connecting mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(dataBaseConfig.db, {
  userNewUrlParser: true
}).then(() => {
    console.log('Database connected sucessfully')
  },
  error => {
    console.log('Could not connected to database :' + error)
  }
)

//Set Up express js port
const studentRoute = require('../backend/routes/student.route');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/meanstack8')));
app.use('/', express.static(path.join(__dirname, 'dist/meanstack8')));
app.use('/api', studentRoute);

//Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port' + port)
})

//Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Index Route
app.get('/', (req, res) => {
  res.send('invaild endpoint');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/meanstack8/index.html'));
});

//error handler
app.use(function(err, req, res, next){
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
