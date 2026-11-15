import { MotionConfig } from 'motion/react'

import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
import { Home } from './pages/Home'

export function App() {
  return (
    <MotionConfig reducedMotion="user">
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
    </MotionConfig>
  )
}
