// awsconfig.ts

const awsconfig = {
  Auth: {
    region: 'eu-north-1',  // Replace with your AWS region (e.g., 'us-east-1')
    userPoolId: 'eu-north-1_6vOjqyU8i',  // Your Cognito User Pool ID (you can find this in your Cognito console)
    userPoolWebClientId: '4jr21tvj6ii25lmmsjiko8dg3e',  // Your App Client ID (find this under App clients in Cognito)
    oauth: {
      domain: 'https://eu-north-1xejhwqift.auth.eu-north-1.amazoncognito.com',  // Your Cognito domain (check under Domain name in Cognito)
      scope: ['email', 'openid'],
      redirectSignIn: 'http://localhost:3000/auth/callback',  // The callback URL for local testing
      redirectSignOut: 'http://localhost:3000',  // The URL after logout
      responseType: 'code',  // Code flow for authorization
    },
  },
};

export default awsconfig;

