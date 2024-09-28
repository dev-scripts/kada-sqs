import AWS from 'aws-sdk';

const configureAWS = () => {
    AWS.config.update({ 
        region: process.env.AWS_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
};

export default configureAWS;
