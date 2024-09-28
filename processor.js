
import AWS from 'aws-sdk';
import configureAWS from './awsConfig.js'; 

configureAWS();

const sqs = new AWS.SQS();
const queueURL = process.env.SQS_QUEUE_URL;

const receiveMessages = async () => {
    const params = {
        QueueUrl: queueURL,
        MaxNumberOfMessages: 10,
        WaitTimeSeconds: 20,
    };

    try {
        const data = await sqs.receiveMessage(params).promise();
        if (data.Messages) {
            await Promise.all(data.Messages.map(async (message) => {
                console.log('Received message:', message.Body);
                //delete the processed message.
                await deleteMessage(message.ReceiptHandle);
            }));
        } else {
            console.log('No messages to process.');
        }
    } catch (error) {
        console.error('Error receiving messages:', error);
    }
};


const deleteMessage = async (receiptHandle) => {
    const params = {
        QueueUrl: queueURL,
        ReceiptHandle: receiptHandle,
    };

    try {
        await sqs.deleteMessage(params).promise();
        console.log('Message deleted successfully');
    } catch (error) {
        console.error('Error deleting message:', error);
    }
};

receiveMessages();
