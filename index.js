const sequelize = require('./config/connection');
const models = require('./models');

sequelize.sync({ force: true }).then(() => {
  console.log('Database synced!');
});
