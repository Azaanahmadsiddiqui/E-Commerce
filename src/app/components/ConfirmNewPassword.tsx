'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  CognitoUserPool,
  CognitoUser,
} from 'amazon-cognito-identity-js'

// Cognito config
const poolData = {
  UserPoolId: 'us-east-1_JAKllGdKX',
  ClientId: '3p17tai7nq1ig2167stb97cduo',
}
const userPool = new CognitoUserPool(poolData)

function NewPassword() {
  const [username, setUsername] = useState('')
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  const confirmNewPassword = (
    username: string,
    verificationCode: string,
    newPassword: string
  ) => {
    const user = new CognitoUser({
      Username: username,
      Pool: userPool,
    })

    user.confirmPassword(verificationCode, newPassword, {
      onSuccess: (result) => {
        console.log('Password reset successful:', result)
        setSuccess('Password changed successfully.')
        setError('')
        // Navigate to login page after short delay
        setTimeout(() => {
          router.push('/Login')
        }, 1500)
      },
      onFailure: (err) => {
        console.error('Error confirming new password:', err.message || JSON.stringify(err))
        setError(err.message || 'Failed to reset password.')
        setSuccess('')
      },
    })
  }

  const handleSubmit = () => {
    if (!username || !code || !newPassword) {
      setError('All fields are required.')
      return
    }
    confirmNewPassword(username, code, newPassword)
  }

  return (
    <div className="h-screen flex">
      {/* Left Side Image */}
      <div className="w-1/2 hidden md:block">
        <Image
          src="/images/Sideimage.png"
          alt="Reset Password side"
          width={600}
          height={800}
          className="h-full object-cover"
        />
      </div>

      {/* Right Side Form */}
      <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
        <h1 className="text-4xl font-bold mb-6">Reset Password</h1>
        <p className="mb-4 text-gray-600">Enter the code you received and set a new password.</p>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border-b border-gray-400 py-2 mb-4 w-full focus:outline-none"
        />
        <input
          type="text"
          placeholder="Verification Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border-b border-gray-400 py-2 mb-4 w-full focus:outline-none"
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border-b border-gray-400 py-2 mb-4 w-full focus:outline-none"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <button
          className="bg-red-500 hover:bg-blue-600 text-white py-2 w-full rounded mt-2"
          onClick={handleSubmit}
        >
          Submit New Password
        </button>
      </div>
    </div>
  )
}

export default NewPassword
