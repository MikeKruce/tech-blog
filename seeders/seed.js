const sequelize = require('../config/connection');
const { User } = require('../models');
const bcrypt = require('bcryptjs');

const userData = [
  {
    username: 'john_doe',
    email: 'john@example.com',
    password: 'password123',
  },
  {
    username: 'test1',
    email: 'test1@mail.com',
    password: 'test1',
  },
  {
    username: 'test2',
    email: 'test2@mail.com',
    password: 'test2',
  }
];

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const hashedUserData = await Promise.all(
    userData.map(async (user) => ({
      ...user,
      password: await bcrypt.hash(user.password, 10)
    }))
  );

  await User.bulkCreate(hashedUserData, {
    individualHooks: true,
    returning: true,
  });

  console.log('Database seeded!');
  process.exit(0);
};

seedDatabase();
