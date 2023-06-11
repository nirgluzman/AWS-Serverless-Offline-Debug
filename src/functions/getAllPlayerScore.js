import Responses from '../common/API_Responses.js';

import DynamoDB from '../common/DynamoDB.js';

const tableName = process.env.tableName;

export const handler = async (event) => {
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
