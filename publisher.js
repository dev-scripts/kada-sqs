import AWS from 'aws-sdk';
import readline from 'readline';
import configureAWS from './awsConfig.js'; 
configureAWS();

const sqs = new AWS.SQS();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const sendMessage = (messageBody) => {
    const params = {
        MessageBody: messageBody, 
        QueueUrl: process.env.SQS_QUEUE_URL, 
    };

    sqs.sendMessage(params, (err, data) => {
        if (err) {
            console.error('Error sending message:', err);
        } else {
            console.log('Message sent successfully, MessageId:', data.MessageId);
            console.log('Message sent successfully \n');
        }
    });
};


rl.question('Enter the message to send to SQS: \n \n ', (messageBody) => {
    sendMessage(messageBody);
    rl.close();
});
