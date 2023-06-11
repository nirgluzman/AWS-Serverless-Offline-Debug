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

// https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.html
// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/modules/_aws_sdk_lib_dynamodb.html
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'; // ES Modules import
const client = new DynamoDBClient(config); // DynamoDB client creation

import {
  DynamoDBDocumentClient,
  ScanCommand,
  GetCommand,
  QueryCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
} from '@aws-sdk/lib-dynamodb';
const ddbDocClient = DynamoDBDocumentClient.from(client); // client is DynamoDB client

const DynamoDB = {
  scan(TableName) {
    const input = {
      TableName,
    };
    const command = new ScanCommand(input);
    return ddbDocClient.send(command);
  },

  get(TableName, ID) {
    const input = {
      TableName,
      Key: { ID },
    };
    const command = new GetCommand(input);
    return ddbDocClient.send(command);
  },

  write(TableName, user) {
    const input = {
      TableName,
      Item: user,
    };
    const command = new PutCommand(input);
    return ddbDocClient.send(command);
  },

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
    const command = new UpdateCommand(input);
    return ddbDocClient.send(command);
  },

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
    return ddbDocClient.send(command);
  },

  delete(TableName, ID) {
    const input = {
      TableName,
      Key: { ID },
      ReturnValues: 'ALL_OLD',
    };
    const command = new DeleteCommand(input);
    return ddbDocClient.send(command);
  },
};

export default DynamoDB;
