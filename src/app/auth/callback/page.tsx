'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const hash = window.location.hash.substring(1)
    const params = new URLSearchParams(hash)
    const accessToken = params.get('access_token')
    const idToken = params.get('id_token')
    const error = params.get('error')

    if (error) {
      console.error('OAuth Error:', error)
    
      return
    }

    if (accessToken || idToken) {
    
      localStorage.setItem('access_token', accessToken || '')
      localStorage.setItem('id_token', idToken || '')

      router.push('/')
    } else {
      console.warn('No token found in callback.')
      router.push('/')
    }
  }, [router])

  return <p>Logged in Successfully.</p>
}
