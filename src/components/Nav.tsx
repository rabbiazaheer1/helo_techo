import { ArrowUpRight, Menu, Phone, X } from 'lucide-react'
import { AnimatePresence, motion, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'

import { NAV, SITE } from '../data'
import { cx } from '../lib/cx'
import { Brand } from './Logo'
import { ChannelMark } from './Social'
import { PulseDot } from './Ui'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-[linear-gradient(90deg,#25D366,#1A63D8,#6F4BF2,#E1306C,#F59E0B,#0E9A9E)]"
        aria-hidden
      />
      <header
        className={cx(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-[var(--duration-base)]',
          scrolled ? 'bg-white/80 shadow-[0_12px_30px_-24px_rgb(9_30_74/0.5)] backdrop-blur-xl' : 'bg-transparent',
        )}
      >
        <div className="mx-auto flex h-18 w-full max-w-[1320px] items-center justify-between gap-4 px-4 sm:px-6">
          <a href="#top" className="shrink-0" aria-label={`${SITE.name} — home`}>
            <Brand size="sm" className="transition-transform duration-[var(--duration-base)] hover:-translate-y-px" />
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Sections">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3.5 py-2 text-[14px] font-medium text-muted transition-colors duration-[var(--duration-fast)] hover:bg-soft hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Chat with us on WhatsApp at ${SITE.phone}`}
              title="Chat on WhatsApp"
              className="hidden size-10 place-items-center rounded-full transition-transform duration-[var(--duration-fast)] hover:-translate-y-0.5 sm:grid"
            >
              <ChannelMark kind="whatsapp" className="size-10" glyphClassName="size-5" rounded="rounded-full" />
            </a>
            <a
              href={SITE.phoneHref}
              className="hidden items-center gap-2 rounded-full border border-line-strong bg-white/70 px-3.5 py-2 text-[13.5px] font-medium text-ink transition-colors hover:border-brand hover:text-brand md:inline-flex"
            >
              <Phone className="size-3.5" aria-hidden />
              {SITE.phone}
            </a>
            <a
              href="#contact"
              className="hidden items-center gap-2 rounded-full bg-[linear-gradient(115deg,#1a63d8,#4b53e8_58%,#0e9a9e)] px-4 py-2.5 text-[13.5px] font-medium text-white shadow-[0_12px_26px_-16px_rgb(26_99_216/0.9)] transition-[filter,transform] duration-[var(--duration-fast)] hover:brightness-[1.07] active:scale-[0.98] sm:inline-flex"
            >
              <PulseDot className="size-1.5" />
              Book a free demo
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="grid size-10 place-items-center rounded-full border border-line-strong bg-white/80 text-ink transition-colors hover:border-brand hover:text-brand lg:hidden"
            >
              <Menu className="size-4.5" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[60] bg-night/40 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="m-3 rounded-[26px] bg-white p-5 shadow-[var(--shadow-float)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <Brand size="sm" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid size-9 place-items-center rounded-full border border-line-strong text-ink"
                >
                  <X className="size-4" aria-hidden />
                </button>
              </div>
              <nav className="mt-5 flex flex-col" aria-label="Sections">
                {NAV.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-line py-3.5 text-[17px] font-medium tracking-[-0.02em] text-ink"
                  >
                    {item.label}
                    <ArrowUpRight className="size-4 text-faint" aria-hidden />
                  </a>
                ))}
              </nav>
              <div className="mt-5 flex flex-col gap-2">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="flex h-12 items-center justify-center rounded-full bg-[linear-gradient(115deg,#1a63d8,#4b53e8_58%,#0e9a9e)] text-[15px] font-medium text-white"
                >
                  Book a free demo
                </a>
                <a
                  href={SITE.phoneHref}
                  className="flex h-12 items-center justify-center gap-2 rounded-full border border-line-strong text-[15px] font-medium text-ink"
                >
                  <Phone className="size-4" aria-hidden />
                  {SITE.phone}
                </a>
                <p className="mt-1 text-center text-[12.5px] text-muted">{SITE.email}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
