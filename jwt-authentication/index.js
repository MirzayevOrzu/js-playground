const exress = require('express');
const jwt = require('jsonwebtoken');

const user = {
  username: 'orzu',
  password: 'jagira123',
};

const app = express();

app.use(express.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username !== user.username) {
    res.status(400).json({
      message: 'Invalid credentials',
      field: 'username',
    });
  } else if (password !== user.password ) {
    9
  }
});
