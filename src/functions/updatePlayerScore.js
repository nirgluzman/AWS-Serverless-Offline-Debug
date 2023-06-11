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

  if (!event.hasOwnProperty('body')) {
    // failed without a body
    return Responses._400({ message: 'missing score info in message body' });
  }

  const { score } = JSON.parse(event.body);

  if (!score) {
    // failed without a score
    return Responses._400({ message: 'missing score field in message body' });
  }

  try {
    const response = await DynamoDB.update(tableName, ID, 'score', score);

    return Responses._200(response.Attributes);
  } catch (err) {
    console.log('error in DynamoDB UPDATE', err);
    return Responses._500({ message: err.message });
  }
};
