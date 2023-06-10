const Responses = require('../common/API_Responses');

const DynamoDB = require('../common/DynamoDB');

const tableName = process.env.tableName;

exports.handler = async (event) => {
  console.log('event', event);

  const { game } = event.pathParameters;

  if (!game) {
    // failed without a game
    return Responses._400({ message: 'missing game in the path parameters' });
  }

  try {
    const response = await DynamoDB.query(
      tableName,
      'game-index',
      'game',
      game
    );

    if (JSON.stringify(response.Items) === '[]') {
      return Responses._400({ message: 'no users found' });
    }

    return Responses._200(response.Items);
  } catch (err) {
    console.log('error in DynamoDB GET', err);
    return Responses._500({ message: err.message });
  }
};
