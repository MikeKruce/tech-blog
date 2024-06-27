const router = require('express').Router();
const { User } = require('../../models');

// Sign up route
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;
      res.status(200).json(newUser);
    });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ message: 'Username or email already exists. Please choose another.' });
    } else {
      res.status(400).json(err);
    }
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      console.log('User not found:', req.body.email);
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = user.checkPassword(req.body.password);

    if (!validPassword) {
      console.log('Invalid password for user:', req.body.email);
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;
      res.status(200).json({ user, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log('Login error:', err);
    res.status(400).json({ message: 'Login failed, please try again' });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
