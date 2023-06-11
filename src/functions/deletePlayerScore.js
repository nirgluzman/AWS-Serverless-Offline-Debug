import Responses from '../common/API_Responses.js';

import DynamoDB from '../common/DynamoDB.js';

const tableName = process.env.tableName;

export const handler = async (event) => {
  console.log('event', event);

  const { ID } = event.pathParameters;

  if (!ID) {
    // failed without an ID
    return Responses._400({ message: 'missing ID in the path parameters' });
  }

  try {
    const user = await DynamoDB.delete(tableName, ID);

    if (JSON.stringify(user) === '{}') {
      return Responses._400({ message: 'failed to get user by ID' });
    }

    return Responses._200({ message: 'item has been deleted' });
  } catch (err) {
    console.log('error in DynamoDB DELETE', err);
    return Responses._500({ message: err.message });
  }
};
