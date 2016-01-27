# slackhr-slash
Simple interface to query Cake HR directory using a slash command.

### Usage
It’s a slack slash command so you can use it as follow:

	/slackhr [query here]
	/slackhr today (will give a list of people absent today)
	/slackhr 01-01-2016 to 10-01-2016 (January 1st 2016 and October 10th 2016)

The range can be expressed in many ways:
* Today, Tomorrow, Yesterday, Last Friday, etc
* 17 August 2013 - 19 August 2013
* This Friday
* 5 days ago
* Sat Aug 17 2013 18:40:39 GMT+0900 (JST)
* 2014-11-30T08:15:30-05:30

### Prerequisites
1. [AWS CLI](https://aws.amazon.com/cli/)
2. Execution Role ARN for your Lambda
3. Create a `config.json`. This file is gitignored by default because this is where you would put any api key's and other secret info that your lambda may need.

### Commands
* `npm run create EXECUTION_ROLE_ARN` build and create your Lambda on AWS
* `npm run invoke {\"type\": \"sweet\"}` invoke your deployed Lambda with inline json
* `npm run localInvoke` invoke lambda.js with mock event json
* `npm run deploy` build and deploy to AWS

### Execution Role ARN(Amazon Resource Name)
Before you can create your Lambda you need to create an execution role. If you did any of the Lambda hello world tutorials in the AWS console you should already have a role created. Either way you need to goto the AWS Console -> Security & Identity -> IAM -> Roles. Get the ARN of `lambda_basic_execution` or create a new role based on `role.example.json` and get the ARN from that. The full ARN looks something like `arn:aws:iam::YOUR_ACCOUNT_ID:role/lambda_basic_execution`.

## Contributing
Improvements are welcome! Just fork, push your changes to a new branch, and create a pull request!
