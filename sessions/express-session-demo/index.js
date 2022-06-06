import express from 'express';
import path from 'node:path';
import url from 'node:url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs'
import session from 'express-session';
import MongoStore from 'connect-mongo';
import User from './User.js';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const app = express();

dotenv.config({
  path: path.join(__dirname, '.env')
});

const DB_USER_NAME = process.env.DB_USER_NAME;
const DB_USER_PWD = process.env.DB_USER_PWD;
const SESSION_SECRET = process.env.SESSION_SECRET;

const sessionStore = MongoStore.create({
  mongoUrl: `mongodb://${DB_USER_NAME}:${DB_USER_PWD}@localhost:27017/test`
});

const sessionOptions = {
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: new Date(Date.now() + (10 * 60 * 1000)), // 10 minutes
    httpOnly: true,
    secure: false, // server should be using https to set this to true
  },
  store: sessionStore
};

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionOptions));

app.get('/register', (req, res) => {

  res.render('register');
});

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.redirect('/register');
  }

  await User.create({ username, email, password: bcrypt.hashSync(password, 10) });

  res.redirect('/login');
});

app.get('/login', (req, res) => {

  res.render('login');
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    console.log('user not found')
    return res.redirect('/login');
  }

  if (!bcrypt.compareSync(password, user.password)) {
    console.log('password incorrect');
    return res.redirect('/login');
  }
  
  req.session.user = user;
  res.redirect('/');
});

app.get('/', isAuthenticated, (req, res) => {

  res.render('index', { user: req.session.user });
});

app.get('/logout', (req, res) => {

  req.session.destroy();

  res.redirect('/login');
});

mongoose.connect(
  `mongodb://${DB_USER_NAME}:${DB_USER_PWD}@localhost:27017/test`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) console.log('DB connection error: ', err);

    console.log('DB connection successfull');

    app.listen(8080, () => {
      console.log('Server started on port 8080');
    });
  }
);

// Authentication middleware
function isAuthenticated(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  next();
}
