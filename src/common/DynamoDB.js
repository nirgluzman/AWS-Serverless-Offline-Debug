let config = {};
if (process.env.IS_OFFLINE) {
  config = {
    region: 'localhost',
    endpoint: 'http://localhost:8000',
  };
} else {
  config = {
    region: process.env.REGION,
  };
}

import {
  DynamoDBClient,
  ScanCommand,
  GetItemCommand,
  PutItemCommand,
  UpdateItemCommand,
  QueryCommand,
  DeleteItemCommand,
} from '@aws-sdk/client-dynamodb';
const client = new DynamoDBClient(config);

const DynamoDB = {
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/scancommand.html
  scan(TableName) {
    const input = {
      TableName,
    };
    const command = new ScanCommand(input);
    return client.send(command);
  },

  // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/getitemcommand.html
  get(TableName, ID) {
    const input = {
      TableName,
      Key: { ID },
    };
    const command = new GetItemCommand(input);
    return client.send(command);
  },

  // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/putitemcommand.html
  write(TableName, user) {
    const input = {
      TableName,
      Item: user,
    };
    const command = new PutItemCommand(input);
    return client.send(command);
  },

  // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/updateitemcommand.html
  update(TableName, ID, updateKey, updateValue) {
    const input = {
      TableName,
      Key: { ID },
      UpdateExpression: `set ${updateKey} = :updateValue`,
      ExpressionAttributeValues: {
        ':updateValue': updateValue,
      },
      ReturnValues: 'ALL_NEW',
    };
    const command = new UpdateItemCommand(input);
    return client.send(command);
  },

  // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/querycommand.html
  query(TableName, index, queryKey, queryValue) {
    const input = {
      TableName,
      IndexName: index,
      KeyConditionExpression: `${queryKey} = :hkey`,
      ExpressionAttributeValues: {
        ':hkey': queryValue,
      },
    };
    const command = new QueryCommand(input);
    return client.send(command);
  },

  // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/deleteitemcommand.html
  delete(TableName, ID) {
    const input = {
      TableName,
      Key: { ID },
      ReturnValues: 'ALL_OLD',
    };
    const command = new DeleteItemCommand(input);
    return client.send(command);
  },
};

export default DynamoDB;
