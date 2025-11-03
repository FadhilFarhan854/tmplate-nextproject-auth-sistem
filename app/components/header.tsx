"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Dropdown, DropdownItem } from "@/components/ui/dropdown"
import { Heart, Menu, X, User, LogOut } from "lucide-react"
import { useState, useEffect, useRef } from "react"

interface UserData {
  id: number
  name: string | null
  email: string
  role: string
}

export default function Header() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => setIsOpen(!isOpen)

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/me')
        
        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
        }
      } catch (error) {
        console.error('Failed to fetch user:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      })
      setUser(null)
      setIsDropdownOpen(false)
      setIsOpen(false)
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const handleProfile = () => {
    setIsDropdownOpen(false)
    setIsOpen(false)
    router.push('/dashboard')
  }

  return (
    <header className="sticky top-0 z-50">
      <div className="absolute inset-0 bg-background/60 backdrop-blur-md border-b border-white/10" />

      <nav className="relative flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-xl bg-linear-to-br from-primary to-primary/80 text-primary-foreground shadow-lg group-hover:shadow-xl transition-shadow">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" />
          </div>
          <span className="text-xl sm:text-2xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent hidden sm:inline">
            CareHub
          </span>
          <span className="text-xl sm:text-2xl font-bold text-primary sm:hidden">CH</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {["Services", "For Caregivers", "For Schools", "About", "Contact"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="px-4 py-2 text-foreground/80 hover:text-primary font-medium transition-colors relative group"
            >
              {item}
              <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-linear-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
          ))}
        </div>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center gap-3">
          {isLoading ? (
            <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
          ) : user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-linear-to-r from-primary to-accent text-primary-foreground hover:shadow-lg transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <span className="font-medium">
                  {user.name || user.email.split('@')[0]}
                </span>
              </button>

              {isDropdownOpen && (
                <Dropdown>
                  <DropdownItem onClick={handleProfile}>
                    <User className="w-4 h-4" />
                    Profile
                  </DropdownItem>
                  <DropdownItem 
                    onClick={handleLogout}
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </DropdownItem>
                </Dropdown>
              )}
            </div>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="text-foreground/80 hover:text-primary hover:bg-primary/5 font-medium">
                  Log In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-linear-to-r from-primary to-accent text-primary-foreground hover:shadow-lg transition-shadow font-medium">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg hover:bg-primary/10 text-foreground transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {isOpen && (
        <div className="md:hidden border-t border-white/10">
          <div className="bg-background/50 backdrop-blur-md px-4 py-3 space-y-2">
            {["Services", "For Caregivers", "For Schools", "About", "Contact"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="block px-4 py-2.5 text-foreground/80 hover:text-primary hover:bg-primary/10 rounded-lg font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            ))}
            <div className="pt-2 border-t border-white/10">
              {isLoading ? (
                <div className="w-full h-10 rounded-lg bg-muted animate-pulse" />
              ) : user ? (
                <div className="space-y-2">
                  <div className="px-4 py-2 bg-linear-to-r from-primary/10 to-accent/10 rounded-lg">
                    <div className="flex items-center gap-2 text-foreground">
                      <User className="w-5 h-5 text-primary" />
                      <span className="font-medium">{user.name || user.email.split('@')[0]}</span>
                    </div>
                  </div>
                  <Button
                    onClick={handleProfile}
                    variant="ghost"
                    className="w-full justify-start text-foreground/80 hover:text-primary hover:bg-primary/5 font-medium"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Button>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="w-full justify-start text-destructive hover:bg-destructive/10 font-medium"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link href="/login" className="flex-1" onClick={() => setIsOpen(false)}>
                    <Button
                      variant="ghost"
                      className="w-full text-foreground/80 hover:text-primary hover:bg-primary/5 font-medium"
                    >
                      Log In
                    </Button>
                  </Link>
                  <Link href="/register" className="flex-1" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-linear-to-r from-primary to-accent text-primary-foreground hover:shadow-lg transition-shadow font-medium">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
