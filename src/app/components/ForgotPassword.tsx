'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {CognitoUserPool,CognitoUser,} from 'amazon-cognito-identity-js'

const poolData = {
  UserPoolId: 'us-east-1_JAKllGdKX',
  ClientId: '3p17tai7nq1ig2167stb97cduo',
}
const userPool = new CognitoUserPool(poolData)


const forgotPassword = (
  email: string,
  onSuccess: () => void,
  onFailure: (message: string) => void
) => {
  const user = new CognitoUser({
    Username: email, // must be Username, not Email
    Pool: userPool,
  })

  user.forgotPassword({
    onSuccess: (result) => {
      console.log('Password reset initiated:', result)
      onSuccess()
    },
    onFailure: (err) => {
      console.error('Error initiating password reset:', err.message || JSON.stringify(err))
      onFailure(err.message || 'Failed to send reset code.')
    },
  })
}


function ForgotPassword() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleForgot = () => {
    forgotPassword(
      email,
      () => {
        setSuccess('Reset code sent! Check your email.')
        setError('')
        router.push('/newPassword')
      },
      (errMsg) => {
        setError(errMsg)
        setSuccess('')
      }
    )
  }

  return (
    <div className="h-screen flex">
      {/* Left Image */}
      <div className="w-1/2 hidden md:block">
        <Image
          src="/images/Sideimage.png"
          alt="Forgot password side"
          width={600}
          height={800}
          className="h-full object-cover"
        />
      </div>

      {/* Right Form */}
      <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
        <h1 className="text-4xl font-bold mb-6">Forgot Password</h1>
        <p className="mb-4 text-gray-600">Enter your email to reset password</p>
        <input
          type="text"
          placeholder="Email / Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-b border-gray-400 py-2 mb-4 w-full focus:outline-none"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <button
          className="bg-red-500 hover:bg-blue-600 text-white py-2 w-full rounded mt-2"
          onClick={handleForgot}
        >
          Send Reset Code
        </button>
      </div>
    </div>
  )
}

export default ForgotPassword
