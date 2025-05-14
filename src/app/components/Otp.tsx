'use client';

import React, { useState } from 'react';
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';
import { useRouter } from 'next/navigation'; // ✅ Import router

// Cognito User Pool Config
const poolData = {
  UserPoolId: 'us-east-1_JAKllGdKX',
  ClientId: '3p17tai7nq1ig2167stb97cduo',
};

const userPool = new CognitoUserPool(poolData);

// OTP verification function
const confirmUser = (username: string, verificationCode: string): Promise<string> => {
  const user = new CognitoUser({
    Username: username,
    Pool: userPool,
  });

  return new Promise((resolve, reject) => {
    user.confirmRegistration(verificationCode, true, (err, result) => {
      if (err) {
        reject(err.message || JSON.stringify(err));
      } else {
        resolve(result || 'Confirmed');
      }
    });
  });
};

const ConfirmOtp: React.FC = () => {
  const [username, setUsername] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const router = useRouter(); // ✅ Initialize router

  const handleConfirm = async () => {
    try {
      const result = await confirmUser(username, code);
      setSuccess(`Success: ${result}`);
      setError('');

      // ✅ Redirect to login after a short delay (optional)
      setTimeout(() => {
        router.push('/Login'); // Or use '/login' if lowercase in your routes
      }, 1500);
    } catch (err) {
      setError(err as string);
      setSuccess('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Verify Your Account</h2>

        <input
          type="text"
          placeholder="Username (email)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-3 p-3 border rounded"
        />

        <input
          type="text"
          placeholder="Verification Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full mb-4 p-3 border rounded"
        />

        <button
          onClick={handleConfirm}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Confirm
        </button>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {success && <p className="text-green-500 text-center mt-4">{success}</p>}
      </div>
    </div>
  );
};

export default ConfirmOtp;
