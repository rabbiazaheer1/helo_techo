import { MotionConfig } from 'motion/react'
import type { ReactNode } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'

import { FloatingActions } from './components/FloatingActions'
import { Footer } from './components/Footer'
import { HeyServoWidget } from './components/HeyServoWidget'
import { Nav } from './components/Nav'
import { LocaleProvider } from './lib/locale'
import { AiEmployee } from './pages/AiEmployee'
import { Auth } from './pages/Auth'
import { Home } from './pages/Home'

function MarketingLayout({ children }: { children: ReactNode }) {
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
        {children}
        <Footer />
      </div>
      <HeyServoWidget />
      <FloatingActions />
    </>
  )
}

export function App() {
  return (
    <LocaleProvider>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <MarketingLayout>
                  <Home />
                </MarketingLayout>
              }
            />
            <Route
              path="/ai-employee"
              element={
                <MarketingLayout>
                  <AiEmployee />
                </MarketingLayout>
              }
            />
            <Route path="/demo" element={<Auth />} />
            <Route path="/login" element={<Navigate to="/demo?mode=login" replace />} />
            <Route path="/signup" element={<Navigate to="/demo" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </MotionConfig>
    </LocaleProvider>
  )
}
