import { Sequelize, DataTypes, Model } from '@sequelize/core';

const sequelize = new Sequelize({ dialect: 'momento' });

interface UserInstance extends Model {
  username: string;
  birthday: Date;
  age: number;
  isActive: boolean;
  accountBalance: number;
}

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

async function insertUser(username: string, birthday: Date, age: number, isActive: boolean, accountBalance: number) {
  await User.create({ username, birthday, age, isActive, accountBalance });
}

async function findUser(username: string) {
  return await User.findOne({
    where: { username }
  });
}

async function updateUser(username: string, newValues: Partial<UserInstance>) {
  await User.update(newValues, {
    where: { username }
  });
}

async function deleteUser(username: string) {
  await User.destroy({
    where: { username }
  });
}

async function runForOneUser() {
  await User.sync({ force: false });

  const username = 'taylor';
  const birthday = new Date(Date.UTC(1992, 5, 21));
  const age = 29;
  const isActive = true;
  const accountBalance = 70.07;

  console.log(`\nInserting user ${username}`);
  console.log(`Attributes:
    Username: ${username},
    Birthday: ${birthday.toISOString()},
    Age: ${age},
    Is Active: ${isActive},
    Account Balance: ${accountBalance}`);
  await insertUser(username, birthday, age, isActive, accountBalance);

  console.log(`\nFinding user ${username}`);
  let user = await findUser(username);

  if (user) {
    console.log('\nUser found:');
    console.log(user);
  } else {
    console.log('User not found.');
  }

  const updatedAccountBalance = 65.05;
  const updatedBirthday = new Date(Date.UTC(1992, 5, 21, 2));

  console.log(`\nUpdating user ${username}`);
  console.log(`Updated Attributes:
    Birthday: ${updatedBirthday.toISOString()},
    Account Balance: ${updatedAccountBalance}`);
  await updateUser(username, { accountBalance: updatedAccountBalance, birthday: updatedBirthday });

  user = await findUser(username);

  if (user) {
    console.log('User updated:');
    console.log(user);
  } else {
    console.log('User not found.');
  }

  console.log(`\nDeleting user ${username}`);
  await deleteUser(username);

  user = await findUser(username);

  if (user?.username !== null) {
    console.log('User still exists.');
  } else {
    console.log('User has been deleted.');
  }

  await User.drop();
}


runForOneUser().catch(console.error);
