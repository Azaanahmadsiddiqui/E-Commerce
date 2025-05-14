'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js'
import { isAuthenticated } from '@/lib/auth' 
// ✅ Cognito Config
const poolData = {
  UserPoolId: 'us-east-1_JAKllGdKX',
  ClientId: '3p17tai7nq1ig2167stb97cduo',
}
const userPool = new CognitoUserPool(poolData)

// ✅ Sign-In Function
const signInUser = (
  username: string,
  password: string,
  onSuccess: () => void,
  onFailure: (message: string) => void
) => {
  const authenticationDetails = new AuthenticationDetails({
    Username: username,
    Password: password,
  })

  const user = new CognitoUser({
    Username: username,
    Pool: userPool,
  })

  user.authenticateUser(authenticationDetails, {
    onSuccess: (result) => {
      console.log('Sign-in successful:', result)
      onSuccess()
    },
    onFailure: (err) => {
      console.error('Error signing in:', err.message || JSON.stringify(err))
      onFailure(err.message || 'Login failed.')
    },
  })
}

// ✅ UI Component
function Login() {
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleLogin = () => {
    signInUser(
      username,
      password,
      () => {
        setSuccess('Login successful!')
        setError('')
        router.push('/')
      },
      (errMsg) => {
        setError(errMsg)
        setSuccess('')
      }
    )
  }

  useEffect(() => {
    const token = localStorage.getItem('idToken')
    if (token) {
      router.replace('/') // redirect if already logged in
    }
  }, [router])

  useEffect(() => {
  if (isAuthenticated()) {
    router.replace('/')
  }
}, [router])

  return (
    <div className="w-full h-screen flex">
      {/* Left Side Image */}
      <div className="w-1/2 hidden md:block">
        <Image src="/images/Sideimage.png" alt="Login side" width={600} height={800} className="h-full object-cover" />
      </div>

      {/* Right Side Form */}
      <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
        <h1 className="text-4xl font-bold mb-6">Login</h1>
        <p className="mb-4 text-gray-600">Login with your email</p>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border-b border-gray-400 py-2 mb-4 w-full focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-b border-gray-400 py-2 mb-4 w-full focus:outline-none"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <button
          className="bg-red-500 hover:bg-blue-600 text-white py-2 w-full rounded mt-2"
          onClick={handleLogin}
        >
          Login
        </button>

        {/* ✅ Google Login Button */}
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 w-full rounded mt-4"
          onClick={() => {
            const domain = 'https://a-a-store-login-888.auth.us-east-1.amazoncognito.com' 
            const clientId = '3p17tai7nq1ig2167stb97cduo'
            const redirectUri = 'http://localhost:3000' 
            const url = `${domain}/oauth2/authorize?identity_provider=Google&response_type=token&client_id=${clientId}&redirect_uri=${redirectUri}&scope=email+openid+profile`

            const popup = window.open(url, 'GoogleLogin', 'width=500,height=600')

            const pollTimer = setInterval(() => {
              try {
                if (!popup || popup.closed) {
                  clearInterval(pollTimer)
                }
                if (popup?.location.href.includes(redirectUri)) {
                  const hash = popup.location.hash
                  if (hash) {
                    const params = new URLSearchParams(hash.substring(1))
                    const idToken = params.get('id_token')
                    if (idToken) {
                      localStorage.setItem('idToken', idToken)
                      clearInterval(pollTimer)
                      popup.close()
                      window.location.href = '/' 
                    }
                  }
                }
              } catch (error: unknown) {
                 if (error instanceof Error) {
                  console.error('Error while processing Google login:', error.message)
                } else {
                  console.error('Unknown error during Google login:', error)
                }
              }
            }, 1000)
          }}
        >
          Sign in with Google
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 w-full rounded mt-4"
          onClick={() => {
            const domain = 'https://a-a-store-login-888.auth.us-east-1.amazoncognito.com' 
            const clientId = '3p17tai7nq1ig2167stb97cduo'
            const redirectUri = 'http://localhost:3000'

            const url = `${domain}/oauth2/authorize?identity_provider=Microsoft&response_type=token&client_id=${clientId}&redirect_uri=${redirectUri}&scope=email+openid+profile`
            
            const popup = window.open(url, 'MicrosoftLogin', 'width=500,height=600')

            const pollTimer = setInterval(() => {
              try {
                if (!popup || popup.closed) {
                  clearInterval(pollTimer)
                }
                if (popup?.location.href.includes(redirectUri)) {
                  const hash = popup.location.hash
                  if (hash) {
                    const params = new URLSearchParams(hash.substring(1))
                    const idToken = params.get('id_token')
                    if (idToken) {
                      localStorage.setItem('idToken', idToken)
                      clearInterval(pollTimer)
                      popup.close()
                      window.location.href = '/' 
                    }
                  }
                }
              } catch (error:unknown) {
                     if (error instanceof Error) {
                  console.error('Error while processing Google login:', error.message)
                } else {
                  console.error('Unknown error during Google login:', error)
                }
              }
            }, 1000)
          }}
        >
          Sign in with Microsoft
        </button>

        <p className="mt-6 text-center">
          <Link href="/SignUp">Do not have an account? Register</Link>
        </p>
        <p className="mt-6 text-center">
          <Link href="/forgotPassword">Forgot Password?</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
