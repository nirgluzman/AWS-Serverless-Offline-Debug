const Responses = require('../common/API_Responses');

const DynamoDB = require('../common/DynamoDB');

const tableName = process.env.tableName;

exports.handler = async (event) => {
  console.log('event', event);

  try {
    const users = await DynamoDB.scan(tableName);

    if (users.Count === 0) {
      return Responses._400({ message: 'no users found in DB' });
    }

    return Responses._200(users.Items);
  } catch (err) {
    console.log('error in DynamoDB SCAN', err);
    return Responses._500({ message: err.message });
  }
};
