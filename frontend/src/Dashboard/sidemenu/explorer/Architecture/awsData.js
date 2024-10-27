// awsData.js
const awsData = {
  'Account 1': {
    'us-east-1': {
      services: ['IAM', 'CloudWatch'],
      subnets: ['Subnet A', 'Subnet B'],
      externalServices: {
        regional: ['DynamoDB'],
        global: ['S3'],
      },
    },
    'us-west-1': {
      services: ['IAM', 'Lambda'],
      subnets: ['Subnet C', 'Subnet D'],
      externalServices: {
        regional: ['DynamoDB'],
        global: ['S3'],
      },
    },
  },
  'Account 2': {
    'us-east-1': {
      services: ['IAM', 'S3'],
      subnets: ['Subnet E'],
      externalServices: {
        regional: ['DynamoDB'],
        global: ['S3'],
      },
    },
    'eu-central-1': {
      services: ['CloudWatch', 'DynamoDB'],
      subnets: ['Subnet F', 'Subnet G'],
      externalServices: {
        regional: ['DynamoDB'],
        global: ['S3'],
      },
    },
  },
  // Add more accounts and regions as needed
};

export default awsData;
