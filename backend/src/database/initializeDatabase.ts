import { Sequelize } from 'sequelize';
import LoginLog from './models/LoginLog';
import Password from './models/Password';
import PasswordUsers from './models/PasswordUsers';
import User from './models/User';

let sequelize: Sequelize;

sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/BSI');

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const db = {
  User: User(sequelize),
  Password: Password(sequelize),
  LoginLog: LoginLog(sequelize),
  PasswordUsers: PasswordUsers(sequelize),
  sequelize,
  Sequelize,
};

const keys = Object.keys(db);

keys.forEach((key) => {
  if (!/^S|sequelize$/.test(key)) {
    db[key].associate(db);
  }
});

export default db;
