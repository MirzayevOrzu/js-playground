const express = require('express');
const path = require('node:path');
const expressEjsLayouts = require('express-ejs-layouts');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressEjsLayouts);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index', {
    message: 'Hello EJS',
    value: 2002,
    isProduction: false,
    person: {
      gender: 'Female',
      firstName: 'Fotima',
      lastName: 'Kamolova',
      age: 18,
    },
    cars: [
      {
        model: 'Ford',
        year: '2000',
      },
      {
        model: 'Audi',
        year: '2010',
      },
    ],
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.listen(8080, () => {
  console.log('Server started on port 8080');
});
