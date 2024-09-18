'use client'

import React, { useState, useEffect } from 'react'
import { ArrowRight, GithubIcon, Linkedin, TwitterIcon, Menu, X, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const projectName = "Construction Management Software"
  const projectDescription = "Streamline your construction projects with our comprehensive management solution"
  const deployedAppUrl = "https://your-deployed-app-url.com"
  const githubRepoUrl = "https://github.com/yourusername/your-repo-name"

  const features = [
    {
      name: "Project Management",
      description: "Create, view, update, and delete projects with ease. Track progress and manage resources efficiently.",
      image: "/placeholder.svg?height=200&width=300"
    },
    {
      name: "Real-time Insights",
      description: "Get instant updates on project status, profitability, and future projections to make informed decisions.",
      image: "/placeholder.svg?height=200&width=300"
    },
    {
      name: "Resource Allocation",
      description: "Efficiently allocate materials, equipment, and labor across different projects and tasks.",
      image: "/placeholder.svg?height=200&width=300"
    }
  ]

  const teamMembers = [
    {
      name: "Your Name",
      role: "Full Stack Developer",
      avatar: "/placeholder.svg?height=40&width=40",
      linkedin: "https://www.linkedin.com/in/yourprofile",
      github: "https://github.com/yourusername",
      twitter: "https://twitter.com/yourhandle"
    }
  ]

  const testimonials = [
    {
      name: "John Doe",
      role: "Project Manager",
      company: "ABC Construction",
      content: "This software has revolutionized how we manage our projects. The real-time insights are invaluable.",
      avatar: "/placeholder.svg?height=40&width=40"
    },
    {
      name: "Jane Smith",
      role: "CEO",
      company: "XYZ Builders",
      content: "The resource allocation feature has significantly improved our efficiency. Highly recommended!",
      avatar: "/placeholder.svg?height=40&width=40"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className={`fixed w-full z-10 transition-all duration-300 ${scrollY > 0 ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link href="/">
                <span className="sr-only">{projectName}</span>
                <Image
                  className="h-8 w-auto sm:h-10"
                  src="/placeholder.svg?height=40&width=40"
                  alt="Logo"
                  width={40}
                  height={40}
                />
              </Link>
            </div>
            <div className="-mr-2 -my-2 md:hidden">
              <Button
                variant="ghost"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </Button>
            </div>
            <nav className="hidden md:flex space-x-10">
              {['Features', 'About', 'Testimonials', 'Video'].map((item) => (
                <Link key={item} href={`#${item.toLowerCase()}`} 
                className={`text-base font-medium ${isScrolled ? 'text-gray-900' : 'text-yellow-300'} hover:text-emerald-200`}
                >
                  {item}
                </Link>
              ))}
            </nav>
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <Button asChild variant="ghost" 
                className={`text-base font-medium ${isScrolled ? 'text-gray-900' : 'text-emerald-200'} hover:text-gray-900`}
                >
                <Link href="#">
                  Sign in
                </Link>
              </Button>
              <Button asChild className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Link href={deployedAppUrl}>
                  Try it free
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
            >
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                <div className="pt-5 pb-6 px-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <Image
                        className="h-8 w-auto"
                        src="/placeholder.svg?height=32&width=32"
                        alt="Logo"
                        width={32}
                        height={32}
                      />
                    </div>
                    <div className="-mr-2">
                      <Button
                        variant="ghost"
                        onClick={() => setIsMenuOpen(false)}
                        className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                      >
                        <span className="sr-only">Close menu</span>
                        <X className="h-6 w-6" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <nav className="grid gap-y-8">
                      {['Features', 'About', 'Testimonials', 'Video'].map((item) => (
                        <Link
                          key={item}
                          href={`#${item.toLowerCase()}`}
                          className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span className="ml-3 text-base font-medium text-gray-900">
                            {item}
                          </span>
                        </Link>
                      ))}
                    </nav>
                  </div>
                </div>
                <div className="py-6 px-5 space-y-6">
                  <div>
                    <Button asChild className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                      <Link href={deployedAppUrl}>
                        Try it free
                      </Link>
                    </Button>
                    <p className="mt-6 text-center text-base font-medium text-gray-500">
                      Existing customer?{' '}
                      <Link href="#" className="text-blue-600 hover:text-blue-500">
                        Sign in
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        <section className="pt-20 pb-12 sm:pt-24 sm:pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left"
              >
                <h1>
                  <span className="block text-sm font-semibold uppercase tracking-wide text-gray-300 sm:text-base lg:text-sm xl:text-base">
                    Introducing
                  </span>
                  <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                    <span className="block text-white">{projectName}</span>
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  {projectDescription}
                </p>
                <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                  <Button asChild size="lg" className="mt-3 w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white shadow-sm hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto">
                    <Link href={deployedAppUrl}>
                      View Deployed App
                      <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center"
              >
                <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                  <Button
                    asChild
                    className="relative block w-full bg-white rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <span>
                      <span className="sr-only">Watch our video to learn more</span>
                      <Image
                        className="w-full"
                        src="/placeholder.svg?height=400&width=600"
                        alt="Video thumbnail"
                        width={600}
                        height={400}
                      />
                      <span className="absolute inset-0 w-full h-full flex items-center justify-center" aria-hidden="true">
                        <svg className="h-20 w-20 text-blue-500" fill="currentColor" viewBox="0 0 84 84">
                          <circle opacity="0.9" cx="42" cy="42" r="42" fill="white" />
                          <path d="M55.5039 40.3359L37.1094 28.0729C35.7803 27.1869 34 28.1396 34 29.737V54.263C34 55.8604 35.7803 56.8131 37.1094 55.9271L55.5038 43.6641C56.6913 42.8725 56.6913 41.1275 55.5039 40.3359Z" />
                        </svg>
                      </span>
                    </span>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center mb-12">
              Key Features
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold">{feature.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <Image src={feature.image} alt={feature.name} width={300} height={200} className="mb-4 rounded-lg" />
                      <CardDescription>{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center mb-12">
              About the Project
            </h2>
            <div className="max-w-3xl mx-auto">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-gray-700 mb-6"
              >
                This project was inspired by my experience working in the construction industry. I noticed that many companies struggled with efficient project management and resource allocation. As a developer, I saw an opportunity to create a solution that could streamline these processes and provide real-time insights to stakeholders.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-gray-700 mb-6"
              >
                The Construction Management Software is a Portfolio Project for Holberton School, developed over the course of 4 weeks. It challenged me to apply my full-stack development skills to create a practical solution for a real-world problem.
              </motion.p>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Team Members:</h3>
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center space-x-4 mb-4"
                  >
                    <Avatar>
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-gray-500">{member.role}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Link href={member.linkedin}><Linkedin className="h-5 w-5 text-blue-600" /></Link>
                      <Link href={member.github}><GithubIcon className="h-5 w-5 text-gray-800" /></Link>
                      <Link href={member.twitter}><TwitterIcon className="h-5 w-5 text-blue-400" /></Link>
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Button asChild variant="outline" size="lg">
                  <Link href={githubRepoUrl} className="inline-flex items-center">
                    View on GitHub
                    <GithubIcon className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center mb-12">
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center">
                        <Avatar>
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <CardTitle className="text-lg font-semibold">{testimonial.name}</CardTitle>
                          <CardDescription>{testimonial.role} at {testimonial.company}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-gray-700 italic">&ldquo;{testimonial.content}&rdquo;</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="video" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center mb-12">
              See It in Action
            </h2>
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="aspect-w-16 aspect-h-9"
              >
                <iframe 
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="w-full h-full rounded-lg shadow-lg"
                ></iframe>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-gray-700 mt-6 text-center"
              >
                Watch our video to see how {projectName} can transform your construction project management.
              </motion.p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl text-center mb-8">
                Ready to streamline your construction projects?
              </h2>
              <div className="flex justify-center">
                <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Link href={deployedAppUrl} className="inline-flex items-center">
                    Get Started Now
                    <ChevronRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-gray-400">We&apos;re on a mission to revolutionize construction project management.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="#features" className="text-gray-400 hover:text-white transition-colors duration-200">Features</Link></li>
                <li><Link href="#about" className="text-gray-400 hover:text-white transition-colors duration-200">About</Link></li>
                <li><Link href="#testimonials" className="text-gray-400 hover:text-white transition-colors duration-200">Testimonials</Link></li>
                <li><Link href="#video" className="text-gray-400 hover:text-white transition-colors duration-200">Video</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <Linkedin className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <GithubIcon className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <TwitterIcon className="h-6 w-6" />
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 rounded-r-md transition-colors duration-200">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; {new Date().getFullYear()} {projectName}. All rights reserved.</p>
            <p className="mt-2">A Portfolio Project for <a href="https://www.holbertonschool.com" className="underline">Holberton School</a></p>
          </div>
        </div>
      </footer>
    </div>
  )
}