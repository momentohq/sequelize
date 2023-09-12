import {Sequelize, DataTypes, Model} from '@sequelize/core';

const sequelize = new Sequelize({ dialect: 'momento' });

interface UserInstance extends Model {
  username: string;
  birthday: Date;
  age: number;
  isActive: boolean;
  accountBalance: number;
}

async function runForOneUser() {

  const User = sequelize.define<UserInstance>('User', {
    username: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    birthday: DataTypes.DATE,
    age: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN,
    accountBalance: DataTypes.FLOAT
  });

  // First, let's synchronize the model to create the table
  await User.sync({ force: false });

  // Insert a new user
  await User.create({
    username: 'taylor',
    birthday: new Date(Date.UTC(1992, 5, 21)),
    age: 29,
    isActive: true,
    accountBalance: 70.07
  });

  // Select the user back
  let user = await User.findOne({
    where: {
      username: 'taylor'
    }
  });

  if (user !== null) {
    console.log('User found:\n');
    console.log('Username:', user.username);
    console.log('Birthday:', user.birthday.toISOString());
    console.log('Active:', user.isActive);
    console.log('Account Balance:', user.accountBalance);
  } else {
    console.log('User not found.');
  }

  // Destroy the user
  await User.destroy({
    where: {
      username: 'taylor'
    }
  });

  // Verify that the user has been deleted
  user = await User.findOne({
    where: {
      username: 'taylor'
    }
  });

  if (user?.username) {
    console.log('User still exists:');
  } else {
    console.log('User has been deleted.');
  }

  await User.drop();
}

// Run the functions
runForOneUser().catch(console.error);
