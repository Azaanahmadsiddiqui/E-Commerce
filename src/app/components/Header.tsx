'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Heart, Menu, Search, ShoppingCart, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { CognitoUserPool, CognitoUserSession } from 'amazon-cognito-identity-js'

// Replace these with your Cognito User Pool and App Client details
const poolData = {
  UserPoolId: 'us-east-1_JAKllGdKX',
  ClientId: '3p17tai7nq1ig2167stb97cduo',
}
const userPool = new CognitoUserPool(poolData)

const Header = () => {
  const [username, setUsername] = useState<string | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [profileImage, setProfileImage] = useState<string>('') 
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const user = userPool.getCurrentUser()
    if (user) {
      user.getSession((err: Error | null, session: CognitoUserSession | null ) => {
        if (session && session.isValid()) {
          setUsername(user.getUsername())
        }
      })
    } else {
      // ✅ Google Login: Check for ID Token in localStorage
      const idToken = localStorage.getItem('idToken')
      if (idToken) {
        try {
          const payload = JSON.parse(atob(idToken.split('.')[1]))
          const nameOrEmail = payload.name || payload.email || 'GoogleUser'
          setUsername(nameOrEmail)
        } catch (e) {
          console.error('Invalid Google token', e)
        }
      }
    }
  }, [])

  const handleLogout = () => {
    const user = userPool.getCurrentUser()
    if (user) {
      user.signOut()
    }
    // Clear Google token as well
    localStorage.removeItem('idToken')
    setUsername(null)
    setDropdownOpen(false)
    setProfileImage('')
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setProfileImage(imageUrl)
      setDropdownOpen(false)
    }
  }

  const resetToDefaultImage = () => {
    setProfileImage('')
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownOpen])

  return (
    <nav className='w-full border-b-2 border-gray-300 p-4'>
      <div className='max-w-7xl mx-auto flex items-center justify-between'>
        <Link href={'/'}>
        <h1 className='text-2xl font-bold'>A-A STORE</h1>
        </Link>
        

        {/* Desktop Navigation */}
        <div className='hidden md:flex gap-4'>
          <Link href={'/'} className='text-sm font-normal'>Home</Link>
          <Link href={'/ContactUs'} className='text-sm font-normal'>Contact</Link>
          <Link href={'/AboutUs'} className='text-sm font-normal'>About</Link>
          {!username ? (
            <Link href={'/Login'} className='text-sm font-normal'>Login/Register</Link>
          ) : (
            <div className='relative flex'>
              <Image
                src={profileImage || '/images/profile.png'} 
                alt='Profile'
                width={22}
                height={32}
                className='rounded-full cursor-pointer'
                onClick={() => setDropdownOpen(prev => !prev)}
              />
              <h1 className='text-sm'>Profile</h1>
              {dropdownOpen && (
                <div
                  ref={dropdownRef}
                  className='absolute right-0 mt-2 w-56 bg-white border rounded shadow-lg z-50 p-4 space-y-3'
                >
                  <div className='flex justify-between items-center'>
                    <h3 className='font-bold text-sm'>User Name</h3>
                    <Button onClick={() => setDropdownOpen(false)}>
                      <X className='w-4 h-4' />
                    </Button>
                  </div>
                  <p className='text-sm text-gray-700'>{username}</p>

                  {profileImage && (
                    <div className='flex items-center justify-between text-sm'>
                      <span>Uploaded Picture</span>
                      <Button onClick={resetToDefaultImage}>
                        <X className='w-4 h-4 text-red-600' />
                      </Button>
                    </div>
                  )}

                  <Button
                    variant='ghost'
                    className='w-full text-left'
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Upload Picture
                  </Button>
                  <input
                    placeholder='.'
                    type='file'
                    accept='image/*'
                    className='hidden'
                    ref={fileInputRef}
                    onChange={handleImageChange}
                  />
                  <Button onClick={handleLogout} className='w-full text-left text-red-600' variant='ghost'>
                    Logout
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Search and Icons */}
        <div className='hidden md:flex gap-4'>
          <div className='relative'>
            <Input placeholder='What are you looking for?' className='bg-[#F5F5F5] rounded w-[250px]' />
            <Search className='absolute right-2 top-2' />
          </div>
          <Button variant={'outline'} size={'icon'} className='rounded-full'>
            <Heart />
          </Button>
          <Button variant={'outline'} size={'icon'} className='rounded-full'>
            <ShoppingCart />
          </Button>
        </div>

        {/* Mobile Sheet Menu */}
        <Sheet>
          <SheetTrigger className='flex md:hidden' asChild>
            <Button variant={'outline'} size={'icon'} className='rounded-full'>
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>EXCLUSIVE</SheetTitle>
            </SheetHeader>
            <div className='flex flex-col gap-6 mt-6'>
              <Link href={'#'} className='text-sm font-normal'>Home</Link>
              <Link href={'/ContactUs'} className='text-sm font-normal'>Contact</Link>
              <Link href={'/AboutUs'} className='text-sm font-normal'>About</Link>
              {!username ? (
                <Link href={'/SignUp'} className='text-sm font-normal'>Login / Sign Up</Link>
              ) : (
                <>
                  <h3 className='text-sm font-semibold'>User</h3>
                  <p className='text-sm text-gray-700'>{username}</p>
                  {profileImage && (
                    <div className='flex items-center justify-between text-sm'>
                      <span>Uploaded Picture</span>
                      <Button onClick={resetToDefaultImage}>
                        <X className='w-4 h-4 text-red-600' />
                      </Button>
                    </div>
                  )}
                  <Button
                    variant='outline'
                    className='w-full'
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Upload Picture
                  </Button>
                  <input
                    placeholder='.'
                    type='file'
                    accept='image/*'
                    className='hidden'
                    ref={fileInputRef}
                    onChange={handleImageChange}
                  />
                  <Button onClick={handleLogout} variant={'outline'} className='text-red-600'>
                    Logout
                  </Button>
                </>
              )}
            </div>
            <div className='mt-4'>
              <div className='relative'>
                <Input placeholder='What are you looking for?' className='bg-[#F5F5F5] rounded' />
                <Search className='absolute right-2 top-2' />
              </div>
              <div className='mt-4 space-x-2'>
                <Button variant={'outline'} size={'icon'} className='rounded-full'>
                  <Heart />
                </Button>
                <Button variant={'outline'} size={'icon'} className='rounded-full'>
                  <ShoppingCart />
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

export default Header
