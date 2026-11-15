import { Minus, Plus } from 'lucide-react'
import { AnimatePresence, animate, motion, useInView, useReducedMotion, type HTMLMotionProps } from 'motion/react'
import { useEffect, useId, useRef, useState, type ReactNode } from 'react'

import { cx } from '../lib/cx'

/** Fades and lifts children the first time they scroll into view. */
export function Reveal({ delay = 0, y = 26, className, children, ...rest }: HTMLMotionProps<'div'> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -70px 0px' }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/** Counts up to a value the first time it is seen. */
export function CountUp({ value, duration = 1.5 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const seen = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })
  const reduce = useReducedMotion()
  const [n, setN] = useState(reduce ? value : 0)

  useEffect(() => {
    if (!seen) return
    if (reduce) {
      setN(value)
      return
    }
    const c = animate(0, value, { duration, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [seen, value, reduce, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {n}
    </span>
  )
}

/** A live dot that keeps breathing. */
export function PulseDot({ className, tone = 'teal' }: { className?: string; tone?: 'teal' | 'brand' }) {
  return (
    <span className={cx('relative inline-grid size-2 shrink-0 place-items-center', className)} aria-hidden>
      <span className={cx('absolute inset-0 rounded-full', tone === 'teal' ? 'bg-teal' : 'bg-brand', 'animate-pulse-ring')} />
      <span className={cx('size-2 rounded-full', tone === 'teal' ? 'bg-teal' : 'bg-brand')} />
    </span>
  )
}

const buttonBase =
  'round group/btn relative inline-flex select-none items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,color,border-color,transform,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-out-soft)] prs:scale-[0.98] disabled:pointer-events-none disabled:opacity-50'

const buttonVariants = {
  primary:
    'bg-[linear-gradient(115deg,#1a63d8,#4b53e8_58%,#0e9a9e)] text-white shadow-[var(--shadow-brand)] hov:brightness-[1.06] hov:shadow-[0_26px_60px_-20px_rgb(26_99_216/0.7)]',
  solid: 'bg-ink text-white hov:bg-ink-2',
  outline: 'border border-line-strong bg-white/70 text-ink hov:border-brand hov:text-brand',
  ghost: 'text-ink hov:bg-white/70',
  light: 'on-dark bg-white text-ink hov:bg-white/90',
} as const

const buttonSizes = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-[15px]',
  lg: 'h-14 px-7 text-base',
} as const

export function Btn({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  iconRight,
  external,
}: {
  href: string
  variant?: keyof typeof buttonVariants
  size?: keyof typeof buttonSizes
  className?: string
  children: ReactNode
  iconRight?: ReactNode
  external?: boolean
}) {
  return (
    <a
      href={href}
      className={cx(buttonBase, buttonVariants[variant], buttonSizes[size], className)}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
    >
      <span>{children}</span>
      {iconRight}
    </a>
  )
}

/** Eyebrow + heading + supporting copy, used to open each section. */
export function SectionHead({
  eyebrow,
  title,
  body,
  align = 'center',
  tone = 'ink',
  accent = '#1A63D8',
  className,
}: {
  eyebrow: string
  title: ReactNode
  body?: ReactNode
  align?: 'center' | 'left'
  tone?: 'ink' | 'light'
  accent?: string
  className?: string
}) {
  return (
    <div className={cx('flex flex-col', align === 'center' ? 'items-center text-center' : 'items-start text-left', className)}>
      <span
        className={cx('caps inline-flex items-center gap-2')}
        style={{ color: tone === 'light' ? 'rgb(255 255 255 / 0.7)' : accent }}
      >
        <span className={cx('h-px w-6')} style={{ background: tone === 'light' ? 'rgb(255 255 255 / 0.4)' : accent }} aria-hidden />
        {eyebrow}
      </span>
      <h2
        className={cx(
          'display mt-4 max-w-[22ch] text-[clamp(1.9rem,1.2rem+2.4vw,3.4rem)]',
          tone === 'light' ? 'text-white' : 'text-ink',
          align === 'center' && 'mx-auto',
        )}
      >
        {title}
      </h2>
      {body && (
        <p
          className={cx(
            'mt-5 max-w-2xl text-[clamp(1rem,0.96rem+0.2vw,1.12rem)]',
            tone === 'light' ? 'text-night-muted' : 'text-muted',
          )}
        >
          {body}
        </p>
      )}
    </div>
  )
}

/** One question open at a time. */
export function Accordion({ items, defaultOpen = 0 }: { items: { q: string; a: string }[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen)
  const id = useId()
  return (
    <ul className="divide-y divide-line overflow-hidden rounded-[26px] border border-line bg-white/80">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <li key={item.q}>
            <h3>
              <button
                type="button"
                id={`${id}-b${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-p${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 px-5 py-5 text-left text-[clamp(1rem,0.95rem+0.35vw,1.18rem)] font-medium tracking-[-0.02em] transition-colors hover:text-brand sm:px-7"
              >
                {item.q}
                <span
                  className={cx(
                    'grid size-9 shrink-0 place-items-center rounded-full border transition-colors duration-[var(--duration-fast)]',
                    isOpen ? 'border-brand bg-brand text-white' : 'border-line-strong text-muted group-hover:border-brand group-hover:text-brand',
                  )}
                >
                  {isOpen ? <Minus className="size-4" aria-hidden /> : <Plus className="size-4" aria-hidden />}
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${id}-p${i}`}
                  role="region"
                  aria-labelledby={`${id}-b${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl px-5 pb-6 text-[15px] text-muted sm:px-7">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        )
      })}
    </ul>
  )
}
