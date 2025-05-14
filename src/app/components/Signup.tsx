'use client';
import { Button } from '@/components/ui/button'
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Correct import for Next.js 13+
import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
import Image from 'next/image';

const poolData = {
  UserPoolId: 'us-east-1_JAKllGdKX', 
  ClientId: '3p17tai7nq1ig2167stb97cduo',
};

const userPool = new CognitoUserPool(poolData);

const signUpUser = (username: string, password: string, email: string): Promise<CognitoUser | void> => {
  const attributeList: CognitoUserAttribute[] = [];

  const emailAttribute = new CognitoUserAttribute({
    Name: 'email',
    Value: email,
  });

  attributeList.push(emailAttribute);

  return new Promise((resolve, reject) => {
    userPool.signUp(username, password, attributeList, [], (err, result) => {
      if (err) {
        reject(err.message || JSON.stringify(err));
      } else {
        resolve(result?.user);
      }
    });
  });
};

const Signup: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const router = useRouter(); 

  const handleSignUp = async () => {
    try {
      await signUpUser(username, password, email);
      setSuccess('Sign Up successful! Please check your email for verification.');
      setError('');
      router.push('/otp');
    } catch (err) {
      setError(err as string);
      setSuccess('');
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen">
      {/* Left side image */}
      <div className="w-1/2 md:w-1/2 bg-cover bg-center h-64 md:h-auto">
        <Image src="/images/Sideimage.png" width={800} height={10} alt="Sideimage" />
      </div>

      {/* Right side form */}
      <div className="w-full md:w-1/2 px-4 py-6 bg-white ">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-700">Sign Up</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>
        <Button
          className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
          onClick={handleSignUp}
        >
          Sign Up
        </Button>

        <p className="mt-6 text-center">
          <Link href="/Login">Have an account? Login</Link>
        </p>

        {/* Feedback messages */}
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        {success && <p className="text-green-500 mt-4 text-center">{success}</p>}
      </div>
    </div>
  );
};

export default Signup;

