import { MotionConfig } from 'motion/react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'

import { FloatingActions } from './components/FloatingActions'
import { Footer } from './components/Footer'
import { HeyServoWidget } from './components/HeyServoWidget'
import { Nav } from './components/Nav'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'

function MarketingLayout() {
  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-full bg-brand px-5 py-3 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100]"
      >
        Skip to content
      </a>
      <div id="top" className="flex min-h-svh flex-col">
        <Nav />
        <Home />
        <Footer />
      </div>
      <HeyServoWidget />
      <FloatingActions />
    </>
  )
}

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MarketingLayout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  )
}
