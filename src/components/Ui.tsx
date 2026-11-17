import { Minus, Plus } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useId, useState, type HTMLAttributes, type ReactNode } from 'react'
import { Link } from 'react-router'

import { cx } from '../lib/cx'

/** Layout wrapper — no scroll animation (kept for call-site compatibility). */
export function Reveal({
  delay: _delay,
  y: _y,
  className,
  children,
}: HTMLAttributes<HTMLDivElement> & { delay?: number; y?: number }) {
  void _delay
  void _y
  return <div className={className}>{children}</div>
}

/** Static number display (no count-up). */
export function CountUp({ value }: { value: number; duration?: number }) {
  return <span className="tabular-nums">{value}</span>
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
  const classNames = cx(buttonBase, buttonVariants[variant], buttonSizes[size], className)
  const content = (
    <>
      <span>{children}</span>
      {iconRight}
    </>
  )

  if (!external && href.startsWith('/') && !href.startsWith('//')) {
    return (
      <Link to={href} className={classNames}>
        {content}
      </Link>
    )
  }

  return (
    <a
      href={href}
      className={classNames}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
    >
      {content}
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

/** One question open at a time — numbered floating rows. */
export function Accordion({ items, defaultOpen = 0 }: { items: { q: string; a: string }[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen)
  const id = useId()
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item, i) => {
        const isOpen = open === i
        const n = String(i + 1).padStart(2, '0')
        return (
          <li
            key={item.q}
            className={cx(
              'overflow-hidden rounded-[20px] border transition-[border-color,box-shadow,background-color] duration-[var(--duration-base)]',
              isOpen
                ? 'border-brand/25 bg-white shadow-[0_18px_40px_-28px_rgb(26_99_216/0.45)]'
                : 'border-line bg-white/75 hover:border-line-strong hover:bg-white hover:shadow-[0_12px_28px_-24px_rgb(9_30_74/0.4)]',
            )}
          >
            <h3>
              <button
                type="button"
                id={`${id}-b${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-p${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-start gap-3.5 px-4 py-4 text-start sm:gap-4 sm:px-5 sm:py-5"
              >
                <span
                  className={cx(
                    'mt-0.5 grid size-9 shrink-0 place-items-center rounded-[12px] text-[12px] font-semibold tabular-nums transition-colors duration-[var(--duration-fast)]',
                    isOpen
                      ? 'bg-[linear-gradient(140deg,#1a63d8,#4b53e8)] text-white shadow-[0_10px_20px_-12px_rgb(26_99_216/0.7)]'
                      : 'bg-soft text-muted group-hover:bg-brand-soft group-hover:text-brand',
                  )}
                  aria-hidden
                >
                  {n}
                </span>
                <span
                  className={cx(
                    'min-w-0 flex-1 pt-1 text-[clamp(0.98rem,0.92rem+0.3vw,1.12rem)] leading-snug font-medium tracking-[-0.02em] transition-colors',
                    isOpen ? 'text-ink' : 'text-ink-2 group-hover:text-ink',
                  )}
                >
                  {item.q}
                </span>
                <span
                  className={cx(
                    'mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border transition-colors duration-[var(--duration-fast)]',
                    isOpen
                      ? 'border-brand bg-brand text-white'
                      : 'border-line-strong text-muted group-hover:border-brand group-hover:text-brand',
                  )}
                >
                  {isOpen ? <Minus className="size-3.5" aria-hidden /> : <Plus className="size-3.5" aria-hidden />}
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
                  <div className="border-t border-brand/10 px-4 pt-1 pb-5 sm:px-5">
                    <p className="max-w-3xl ps-[3.25rem] text-[14.5px] leading-relaxed text-muted sm:ps-[3.5rem]">
                      {item.a}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        )
      })}
    </ul>
  )
}
