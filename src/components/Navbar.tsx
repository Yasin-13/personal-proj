import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Menu } from 'lucide-react'

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Add your login logic here
    setIsLoggedIn(true)
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    // Add your signup logic here
  }

  const handleLogout = () => {
    // Add your logout logic here
    setIsLoggedIn(false)
  }

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md">
      <Link to="/" className="text-xl font-bold">E-Shop</Link>
      <div className="hidden md:flex space-x-4">
        <Link to="/products" className="text-gray-600 hover:text-gray-900">Products</Link>
        <Link to="/categories" className="text-gray-600 hover:text-gray-900">Categories</Link>
        <Link to="/cart" className="text-gray-600 hover:text-gray-900">Cart</Link>
      </div>
      <div className="hidden md:flex space-x-2">
        {isLoggedIn ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Login</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Login</SheetTitle>
                  <SheetDescription>Enter your credentials to login.</SheetDescription>
                </SheetHeader>
                <form onSubmit={handleLogin} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Enter your password" required />
                  </div>
                  <Button type="submit" className="w-full">Login</Button>
                </form>
              </SheetContent>
            </Sheet>
            <Sheet>
              <SheetTrigger asChild>
                <Button>Sign Up</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Sign Up</SheetTitle>
                  <SheetDescription>Create a new account.</SheetDescription>
                </SheetHeader>
                <form onSubmit={handleSignup} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter your name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Create a password" required />
                  </div>
                  <Button type="submit" className="w-full">Sign Up</Button>
                </form>
              </SheetContent>
            </Sheet>
          </>
        )}
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <nav className="flex flex-col space-y-4">
            <Link to="/products" className="text-gray-600 hover:text-gray-900">Products</Link>
            <Link to="/categories" className="text-gray-600 hover:text-gray-900">Categories</Link>
            <Link to="/cart" className="text-gray-600 hover:text-gray-900">Cart</Link>
            {isLoggedIn ? (
              <Button onClick={handleLogout}>Logout</Button>
            ) : (
              <>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline">Login</Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Login</SheetTitle>
                      <SheetDescription>Enter your credentials to login.</SheetDescription>
                    </SheetHeader>
                    <form onSubmit={handleLogin} className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="Enter your email" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" placeholder="Enter your password" required />
                      </div>
                      <Button type="submit" className="w-full">Login</Button>
                    </form>
                  </SheetContent>
                </Sheet>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button>Sign Up</Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Sign Up</SheetTitle>
                      <SheetDescription>Create a new account.</SheetDescription>
                    </SheetHeader>
                    <form onSubmit={handleSignup} className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Enter your name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="Enter your email" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" placeholder="Create a password" required />
                      </div>
                      <Button type="submit" className="w-full">Sign Up</Button>
                    </form>
                  </SheetContent>
                </Sheet>
              </>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </nav>
  )
}

