const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB.DocumentClient();

const DynamoDB = {
  // https://dynobase.dev/dynamodb-nodejs/#scan
  scan(TableName) {
    const params = {
      TableName,
    };
    return ddb.scan(params).promise();
  },

  // https://dynobase.dev/dynamodb-nodejs/#get-item
  get(TableName, ID) {
    const params = {
      TableName,
      Key: { ID },
    };
    return ddb.get(params).promise();
  },

  // https://dynobase.dev/dynamodb-nodejs/#put-item
  // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/example_dynamodb_PutItem_section.html
  write(TableName, user) {
    const params = {
      TableName,
      Item: user,
    };
    return ddb.put(params).promise();
  },

  // https://dynobase.dev/dynamodb-nodejs/#update-item
  // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/example_dynamodb_UpdateItem_section.html
  update(TableName, ID, updateKey, updateValue) {
    const params = {
      TableName,
      Key: { ID },
      UpdateExpression: `set ${updateKey} = :updateValue`,
      ExpressionAttributeValues: {
        ':updateValue': updateValue,
      },
      ReturnValues: 'ALL_NEW',
    };
    return ddb.update(params).promise();
  },

  // https://dynobase.dev/dynamodb-nodejs/#query-index
  query(TableName, index, queryKey, queryValue) {
    const params = {
      TableName,
      IndexName: index,
      KeyConditionExpression: `${queryKey} = :hkey`,
      ExpressionAttributeValues: {
        ':hkey': queryValue,
      },
    };
    return ddb.query(params).promise();
  },

  // https://dynobase.dev/dynamodb-nodejs/#delete-item
  delete(TableName, ID) {
    const params = {
      TableName,
      Key: { ID },
      ReturnValues: 'ALL_OLD',
    };
    return ddb.delete(params).promise();
  },
};

module.exports = DynamoDB;
