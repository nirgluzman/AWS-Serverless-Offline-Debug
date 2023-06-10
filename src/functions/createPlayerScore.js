const { v4 } = require('uuid');

const Responses = require('../common/API_Responses');

const DynamoDB = require('../common/DynamoDB');

const tableName = process.env.tableName;

exports.handler = async (event) => {
  console.log('event', event);

  if (!event.hasOwnProperty('body')) {
    // failed without a body
    return Responses._400({ message: 'missing user info in message body' });
  }

  const ID = v4();
  const user = JSON.parse(event.body);
  user.ID = ID;

  try {
    await DynamoDB.write(tableName, user);

    return Responses._200({ message: 'new item has been created' });
  } catch (err) {
    console.log('error in DynamoDB WRITE', err);
    return Responses._500({ message: err.message });
  }
};
