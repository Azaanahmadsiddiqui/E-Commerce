// import { CognitoUser, CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';

// // Configure Cognito User Pool
// const poolData = {
//   UserPoolId: 'us-east-1_XXXXXXXXX',  // Replace with your User Pool ID
//   ClientId: 'XXXXXXXXXXXXXXXXXXXX',  // Replace with your Client ID
// };

// const userPool = new CognitoUserPool(poolData);

// export const signUpUser = async (email: string, password: string, name: string) => {
//   const attributeList: CognitoUserAttribute[] = [];

//   const emailAttribute = new CognitoUserAttribute({
//     Name: 'email',
//     Value: email,
//   });
//   const nameAttribute = new CognitoUserAttribute({
//     Name: 'name',
//     Value: name,
//   });

//   attributeList.push(emailAttribute);
//   attributeList.push(nameAttribute);

//   return new Promise((resolve, reject) => {
//     userPool.signUp(email, password, attributeList, null, (err, result) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(result);
//       }
//     });
//   });
// };

// export const confirmUser = async (email: string, verificationCode: string) => {
//   const user = new CognitoUser({
//     Username: email,
//     Pool: userPool,
//   });

//   return new Promise((resolve, reject) => {
//     user.confirmRegistration(verificationCode, true, (err, result) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(result);
//       }
//     });
//   });
// };

// export const forgotPassword = async (email: string) => {
//   const user = new CognitoUser({
//     Username: email,
//     Pool: userPool,
//   });

//   return new Promise((resolve, reject) => {
//     user.forgotPassword((err, result) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(result);
//       }
//     });
//   });
// };

// export const confirmNewPassword = async (email: string, verificationCode: string, newPassword: string) => {
//   const user = new CognitoUser({
//     Username: email,
//     Pool: userPool,
//   });

//   return new Promise((resolve, reject) => {
//     user.confirmPassword(verificationCode, newPassword, (err, result) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(result);
//       }
//     });
//   });
// };
