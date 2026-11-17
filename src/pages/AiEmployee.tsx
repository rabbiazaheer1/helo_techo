import {
  ArrowRight,
  Box,
  Check,
  Lock,
  MapPin,
  Play,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  UserRound,
} from 'lucide-react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { Link } from 'react-router'

import { Mark } from '../components/Logo'
import { ChannelMark, SOCIALS } from '../components/Social'
import { PulseDot } from '../components/Ui'
import { SITE } from '../data'
import { cx } from '../lib/cx'
import { useLocale } from '../lib/locale'

const FEATURE_ICONS = [ShoppingBag, UserRound, Lock, Box, Truck, Star]
const EASE = [0.22, 1, 0.36, 1] as const

const WA_QR = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(SITE.whatsapp)}`

function FadeIn({
  children,
  className,
  delay = 0,
  y = 24,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}) {
  const reduce = useReducedMotion()
  // Lenient viewport so sections animate on short phones / tablets too.
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px', amount: 0.08 }}
      transition={{ duration: reduce ? 0 : 0.55, delay: reduce ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

function WaBtn({ label, className }: { label: string; className?: string }) {
  return (
    <a
      href={SITE.whatsapp}
      target="_blank"
      rel="noreferrer noopener"
      className={cx(
        'inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 text-[14.5px] font-semibold text-white shadow-[0_14px_32px_-14px_rgb(37_211_102/0.75)] transition-[transform,filter] duration-[var(--duration-fast)] hover:brightness-105 active:scale-[0.98]',
        className,
      )}
    >
      <ChannelMark kind="whatsapp" className="size-6" glyphClassName="size-3.5" rounded="rounded-full" />
      {label}
    </a>
  )
}

function DemoBtn({ label, className }: { label: string; className?: string }) {
  return (
    <Link
      to="/demo"
      className={cx(
        'inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[linear-gradient(115deg,#1a63d8,#4b53e8_55%,#6f4bf2)] px-5 text-[14.5px] font-semibold text-white shadow-[var(--shadow-brand)] transition-[transform,filter] duration-[var(--duration-fast)] hover:brightness-105 active:scale-[0.98]',
        className,
      )}
    >
      {label}
      <ArrowRight className="size-4" aria-hidden />
    </Link>
  )
}

function StatValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })
  const reduce = useReducedMotion()
  const numeric = value.match(/^(\d+)/)
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView || !numeric) return
    const target = Number(numeric[1])
    if (reduce) {
      setN(target)
      return
    }
    const start = performance.now()
    const dur = 1100
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(target * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, numeric, reduce])

  if (!numeric) {
    return (
      <span ref={ref} className="display text-[clamp(1.8rem,1.4rem+1.2vw,2.45rem)] text-brand">
        {value}
      </span>
    )
  }

  return (
    <span ref={ref} className="display text-[clamp(1.8rem,1.4rem+1.2vw,2.45rem)] text-brand">
      {n}
      {value.slice(numeric[1].length)}
    </span>
  )
}

function CallCard() {
  const { copy } = useLocale()
  const p = copy.aiEmployee
  const [phone, setPhone] = useState('')
  const [agree, setAgree] = useState(false)
  const [marketing, setMarketing] = useState(false)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!agree || !phone.trim()) return
    const msg = encodeURIComponent(
      `Hi Hello Techno — please call me for an AI Employee demo.\nNumber: +974 ${phone.trim()}${marketing ? '\n(OK to keep me posted)' : ''}`,
    )
    window.open(`${SITE.whatsapp}?text=${msg}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-[28px] border border-line bg-white/90 p-6 shadow-[var(--shadow-card)] backdrop-blur-sm sm:p-8">
      <span className="pointer-events-none absolute -top-16 -end-10 size-40 rounded-full bg-[radial-gradient(circle,rgb(26_99_216/0.18),transparent_70%)] blur-2xl" aria-hidden />
      <div className="relative flex items-center gap-2">
        <PulseDot className="size-1.5" />
        <h2 className="text-[1.3rem] font-semibold tracking-[-0.03em] text-ink">{p.callTitle}</h2>
      </div>
      <p className="relative mt-2 text-[14px] leading-relaxed text-muted">{p.callBody}</p>

      <form onSubmit={submit} className="relative mt-6 flex flex-1 flex-col">
        <div className="flex overflow-hidden rounded-2xl border border-line-strong bg-soft/50 transition-[border-color,box-shadow] focus-within:border-brand focus-within:shadow-[var(--shadow-focus)]">
          <span className="flex shrink-0 items-center gap-1.5 border-e border-line px-3.5 text-[13.5px] font-medium text-ink">
            <span aria-hidden>🇶🇦</span> QA +974
          </span>
          <input
            type="tel"
            inputMode="numeric"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={p.callPlaceholder}
            className="min-w-0 flex-1 bg-transparent px-3.5 py-3.5 text-[14.5px] text-ink outline-none placeholder:text-faint"
            required
          />
        </div>

        <label className="mt-4 flex cursor-pointer items-start gap-2.5 text-[12.5px] leading-snug text-muted">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="mt-0.5 size-4 shrink-0 rounded border-line-strong accent-brand"
            required
          />
          <span>{p.callAgree}</span>
        </label>

        <label className="mt-2.5 flex cursor-pointer items-start gap-2.5 text-[12.5px] leading-snug text-muted">
          <input
            type="checkbox"
            checked={marketing}
            onChange={(e) => setMarketing(e.target.checked)}
            className="mt-0.5 size-4 shrink-0 rounded border-line-strong accent-brand"
          />
          <span>{p.callMarketing}</span>
        </label>

        <button
          type="submit"
          disabled={!agree}
          className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(115deg,#1a63d8,#4b53e8_55%,#6f4bf2)] text-[15px] font-semibold text-white shadow-[var(--shadow-brand)] transition-[filter,opacity,transform] hover:brightness-105 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45"
        >
          {p.callCta}
          <ArrowRight className="size-4" aria-hidden />
        </button>
        <p className="mt-2.5 text-center text-[12px] text-faint">{p.callHint}</p>

        <div className="mt-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-line" aria-hidden />
          <span className="text-[12px] text-faint">{p.callOr}</span>
          <span className="h-px flex-1 bg-line" aria-hidden />
        </div>
        <Link to="/demo" className="mt-3 text-center text-[14px] font-semibold text-brand hover:text-brand-deep">
          {p.callBrowser}
        </Link>
      </form>
    </article>
  )
}

function WhatsAppCard() {
  const { copy } = useLocale()
  const p = copy.aiEmployee
  const reduce = useReducedMotion()

  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-[28px] border border-line bg-white/90 p-6 shadow-[var(--shadow-card)] backdrop-blur-sm sm:p-8">
      <span className="pointer-events-none absolute -top-12 -start-8 size-36 rounded-full bg-[radial-gradient(circle,rgb(37_211_102/0.2),transparent_70%)] blur-2xl" aria-hidden />
      <span className="relative inline-flex w-fit items-center gap-1.5 self-center rounded-full bg-[#25D366]/15 px-3 py-1 text-[11px] font-semibold tracking-[0.08em] text-[#128C7E] uppercase">
        <ChannelMark kind="whatsapp" className="size-4" glyphClassName="size-2.5" rounded="rounded-full" />
        {p.waBadge}
      </span>
      <h2 className="relative mt-3 text-center text-[1.3rem] font-semibold tracking-[-0.03em] text-ink">{p.waTitle}</h2>
      <p className="relative mt-2 text-center text-[14px] leading-relaxed text-muted">{p.waBody}</p>

      <div className="relative mt-5 flex flex-1 flex-col gap-4 rounded-[22px] bg-[linear-gradient(160deg,#e8f8ef,#f4fcf7)] p-4 sm:flex-row sm:items-stretch">
        <div className="flex flex-col items-center justify-center gap-2 sm:w-[42%]">
          <motion.div
            className="rounded-2xl bg-white p-2.5 shadow-[0_12px_28px_-18px_rgb(9_30_74/0.35)] motion-reduce:transform-none"
            animate={reduce ? undefined : { y: [0, -4, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img src={WA_QR} alt="" width={160} height={160} className="size-[140px] sm:size-[150px]" />
          </motion.div>
          <p className="text-[12.5px] font-medium text-[#128C7E]">{p.waScan}</p>
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-2.5">
          {[
            { key: 'u', node: <div className="max-w-[95%] self-end rounded-2xl rounded-ee-md bg-white px-3 py-2 text-[12.5px] leading-snug text-ink shadow-sm">{p.waUserMsg}</div> },
            {
              key: 'v',
              node: (
                <>
                  <div className="flex max-w-[90%] items-center gap-2 self-start rounded-2xl rounded-es-md bg-[#25D366] px-3 py-2 text-white shadow-sm">
                    <span className="grid size-7 place-items-center rounded-full bg-white/20">
                      <Play className="size-3.5 fill-white" aria-hidden />
                    </span>
                    <span className="h-5 flex-1 overflow-hidden rounded-full bg-white/25">
                      <span className="block h-full w-2/3 animate-shimmer rounded-full bg-white/40" />
                    </span>
                    <span className="text-[11px] tabular-nums opacity-90">0:12</span>
                  </div>
                  <p className="ps-1 text-[10.5px] text-[#128C7E]">{p.waVoice}</p>
                </>
              ),
            },
            { key: 'b', node: <div className="max-w-[95%] self-start rounded-2xl rounded-es-md bg-white px-3 py-2 text-[12.5px] leading-snug text-ink shadow-sm">{p.waBotMsg}</div> },
          ].map((item, i) => (
            <motion.div
              key={item.key}
              className="flex flex-col gap-1"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.18, duration: 0.45, ease: EASE }}
            >
              {item.node}
            </motion.div>
          ))}
        </div>
      </div>

      <p className="relative mt-4 text-center text-[12.5px] text-muted">
        {p.waOn} · {SITE.phone}
      </p>
      <WaBtn label={p.waCta} className="relative mt-3 w-full" />
    </article>
  )
}

function FeatureCard({
  title,
  body,
  image,
  icon: Icon,
  delay,
}: {
  title: string
  body: string
  image: string
  icon: typeof ShoppingBag
  delay: number
}) {
  return (
    <FadeIn delay={delay} y={36}>
      <article className="group relative min-h-[280px] overflow-hidden rounded-[24px] sm:min-h-[320px]">
        <img
          src={image}
          alt=""
          className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.06]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(5_16_31/0.1)_0%,rgb(5_16_31/0.45)_42%,rgb(5_16_31/0.94)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgb(26_99_216/0.25),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="relative flex h-full min-h-[280px] flex-col justify-end p-5 sm:min-h-[320px] sm:p-6">
          <span className="mb-3 grid size-10 place-items-center rounded-xl border border-white/20 bg-white/10 text-white backdrop-blur-md transition-transform duration-300 group-hover:-translate-y-1">
            <Icon className="size-4" aria-hidden />
          </span>
          <h3 className="text-[1.15rem] font-semibold tracking-[-0.02em] text-white">{title}</h3>
          <p className="mt-2 text-[13.5px] leading-relaxed text-white/80">{body}</p>
        </div>
      </article>
    </FadeIn>
  )
}

export function AiEmployee() {
  const { copy } = useLocale()
  const p = copy.aiEmployee
  const reduce = useReducedMotion()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main id="main" className="relative bg-canvas">
      {/* --------------------------------------------------------------- hero */}
      <section className="relative px-4 pt-28 pb-14 sm:px-6 sm:pt-32 sm:pb-16">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <div className="absolute inset-0 grid-lines opacity-50 [mask-image:radial-gradient(ellipse_at_50%_0%,#000_20%,transparent_75%)]" />
          <div className="absolute -top-28 left-1/2 size-[min(100vw,720px)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,#cfe2ff_0%,transparent_68%)] blur-2xl" />
          <div className="absolute top-24 -start-24 size-[22rem] rounded-full bg-[radial-gradient(circle,rgb(111_75_242/0.16),transparent_70%)] blur-3xl" />
          <div className="absolute top-40 -end-16 size-[18rem] rounded-full bg-[radial-gradient(circle,rgb(14_154_158/0.14),transparent_70%)] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-white/80 px-3.5 py-1.5 text-[12.5px] font-medium text-brand shadow-[0_10px_24px_-18px_rgb(26_99_216/0.5)] backdrop-blur-sm"
          >
            <span className="grid size-5 place-items-center rounded-full bg-brand-soft">
              <Sparkles className="size-3" aria-hidden />
            </span>
            {p.badge}
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
            className="mx-auto mt-7 grid size-16 place-items-center rounded-[22px] bg-white shadow-[var(--shadow-card)] ring-1 ring-line sm:size-[4.5rem]"
          >
            <Mark className="size-11 sm:size-12" glow />
          </motion.div>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14, ease: EASE }}
            className="display mt-5 text-[clamp(2.4rem,1.3rem+3.5vw,4.2rem)] tracking-[-0.045em] text-ink"
          >
            {copy.nav.find((n) => n.href === '/ai-employee')?.label ?? 'AI Employee'}
          </motion.p>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: EASE }}
            className="display mt-4 text-[clamp(1.55rem,1.05rem+2vw,2.35rem)] leading-[1.2] tracking-[-0.03em] text-ink"
          >
            {p.headlineLead}{' '}
            <span className="bg-[linear-gradient(115deg,#1a63d8,#6f4bf2_55%,#0e9a9e)] bg-clip-text text-transparent">
              {p.headlineAccent}
            </span>
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
            className="mx-auto mt-5 max-w-2xl text-[15.5px] leading-relaxed text-muted sm:text-[16.5px]"
          >
            {p.body}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4, ease: EASE }}
            className="mt-8 flex flex-wrap items-center justify-center gap-2.5"
          >
            {SOCIALS.map((kind, i) => (
              <motion.span
                key={kind}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + i * 0.05, duration: 0.4, ease: EASE }}
              >
                <ChannelMark
                  kind={kind}
                  className="size-9 shadow-[0_10px_20px_-12px_rgb(9_30_74/0.45)] ring-2 ring-white"
                  glyphClassName="size-4"
                  rounded="rounded-full"
                />
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------------------------ try it live */}
      <section className="relative px-4 pb-16 sm:px-6 sm:pb-20">
        <div className="mx-auto grid w-full max-w-[1100px] gap-5 lg:grid-cols-2">
          <FadeIn delay={0.05}>
            <CallCard />
          </FadeIn>
          <FadeIn delay={0.15}>
            <WhatsAppCard />
          </FadeIn>
        </div>
      </section>

      {/* ---------------------------------------------------------- features */}
      <section className="relative px-4 py-6 sm:px-6 sm:py-10">
        <div className="mx-auto w-full max-w-[1200px] rounded-[32px] border border-line bg-white/70 p-6 shadow-[0_24px_60px_-40px_rgb(9_30_74/0.35)] backdrop-blur-sm sm:p-8 lg:p-10">
          <FadeIn>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand-soft/80 px-3 py-1 text-[12px] font-medium text-brand">
                  <span className="size-1.5 rounded-full bg-brand" aria-hidden />
                  {p.handlesBadge}
                </span>
                <h2 className="display mt-4 text-[clamp(1.7rem,1.2rem+1.8vw,2.6rem)] tracking-[-0.03em] text-ink">
                  {p.handlesTitle}
                </h2>
              </div>
              <p className="max-w-md text-[14.5px] leading-relaxed text-muted lg:pb-1">{p.handlesBody}</p>
            </div>
          </FadeIn>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {p.features.map((f, i) => (
              <FeatureCard key={f.title} {...f} icon={FEATURE_ICONS[i] ?? ShoppingBag} delay={0.04 * i} />
            ))}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {p.stats.map((s, i) => (
              <FadeIn key={s.label} delay={0.06 * i}>
                <div className="rounded-[22px] border border-line bg-[linear-gradient(165deg,#ffffff,#f3f7ff)] px-5 py-6 text-center">
                  <p className="caps text-[10px] text-faint">{s.label}</p>
                  <div className="mt-2">
                    <StatValue value={s.value} />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <p className="mx-auto mt-4 max-w-3xl text-center text-[12px] leading-relaxed text-faint">{p.statsNote}</p>
        </div>
      </section>

      {/* ------------------------------------------------------- multi-brand */}
      <section className="relative px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto grid w-full max-w-[1200px] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <FadeIn>
            <span className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal-soft/80 px-3 py-1 text-[12px] font-medium text-teal-deep">
              <span className="size-1.5 rounded-full bg-teal" aria-hidden />
              {p.multiBadge}
            </span>
            <h2 className="display mt-4 text-[clamp(1.7rem,1.2rem+1.8vw,2.55rem)] tracking-[-0.03em] text-ink">
              {p.multiTitle}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">{p.multiBody}</p>
            <ul className="mt-6 space-y-3">
              {p.multiPoints.map((point, i) => (
                <motion.li
                  key={point}
                  initial={reduce ? false : { opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i, duration: 0.45, ease: EASE }}
                  className="flex items-start gap-2.5 text-[14.5px] leading-snug text-ink-2"
                >
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
                    <Check className="size-3" aria-hidden />
                  </span>
                  {point}
                </motion.li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <DemoBtn label={p.multiDemo} className="w-full sm:w-auto" />
              <WaBtn label={p.multiWa} className="w-full sm:w-auto" />
            </div>
          </FadeIn>

          <FadeIn delay={0.12} y={40}>
            <div className="relative">
              <span className="pointer-events-none absolute -inset-4 rounded-[36px] bg-[radial-gradient(circle_at_40%_30%,rgb(26_99_216/0.2),transparent_65%)] blur-xl" aria-hidden />
              <motion.div
                className="relative overflow-hidden rounded-[28px] shadow-[var(--shadow-float)] ring-1 ring-white/80 motion-reduce:transform-none"
                animate={reduce ? undefined : { y: [0, -8, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              >
                <img src={p.multiImage} alt="" className="aspect-[4/5] w-full object-cover sm:aspect-[5/6]" loading="lazy" />
                <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgb(5_16_31/0.55))] p-5">
                  <p className="flex items-center gap-2 text-[13px] font-medium text-white">
                    <PulseDot className="size-1.5" />
                    24/7 · EN + AR
                  </p>
                </div>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ------------------------------------------------------------- people */}
      <section className="relative px-4 py-10 sm:px-6 sm:py-14">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-[linear-gradient(180deg,rgb(233_241_254/0.7),transparent)]" aria-hidden />
        <div className="relative mx-auto grid w-full max-w-[1200px] items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <FadeIn>
            <span className="inline-flex items-center gap-2 text-[13px] font-medium text-brand">
              <span className="size-1.5 rounded-full bg-brand" aria-hidden />
              {p.peopleBadge}
            </span>
            <h2 className="display mt-4 text-[clamp(1.7rem,1.2rem+1.8vw,2.55rem)] tracking-[-0.03em] text-ink">
              {p.peopleTitleLead}{' '}
              <span className="bg-[linear-gradient(115deg,#1a63d8,#6f4bf2)] bg-clip-text text-transparent">
                {p.peopleTitleAccent}
              </span>
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">{p.peopleBody}</p>
            <ul className="mt-6 space-y-3">
              {p.peoplePoints.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-[14.5px] leading-snug text-ink-2">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-teal-soft text-teal">
                    <Check className="size-3" aria-hidden />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.1} y={32}>
            <aside className="relative overflow-hidden rounded-[28px] border border-line bg-white/95 p-6 shadow-[var(--shadow-float)] sm:p-7">
              <span className="pointer-events-none absolute -top-20 -end-16 size-48 rounded-full bg-[radial-gradient(circle,rgb(111_75_242/0.18),transparent_70%)] blur-2xl" aria-hidden />
              <div className="relative flex items-center gap-3.5">
                <span className="grid size-14 place-items-center overflow-hidden rounded-full bg-brand-soft ring-2 ring-white shadow-[0_10px_24px_-12px_rgb(26_99_216/0.45)]">
                  <Mark className="size-9" />
                </span>
                <div>
                  <p className="text-[1.05rem] font-semibold text-ink">{p.peopleName}</p>
                  <p className="text-[13px] text-muted">{p.peopleRole}</p>
                  <p className="mt-1 flex items-center gap-1 text-[12.5px] font-medium text-brand">
                    <MapPin className="size-3.5" aria-hidden />
                    {p.peoplePlace}
                  </p>
                </div>
              </div>
              <blockquote className="relative mt-5 rounded-2xl border-s-4 border-brand bg-soft/90 px-4 py-3.5 text-[13.5px] leading-relaxed text-ink-2">
                {p.peopleQuote}
              </blockquote>
              <div className="relative mt-5 flex flex-col gap-2.5 sm:flex-row">
                <DemoBtn label={p.peopleDemo} className="flex-1" />
                <WaBtn label={p.peopleWa} className="flex-1" />
              </div>
              <p className="relative mt-4 text-[12.5px] leading-relaxed text-muted">
                {p.peopleFoot}{' '}
                <a href={SITE.phoneHref} className="font-semibold text-brand underline underline-offset-2">
                  {SITE.phone}
                </a>
              </p>
            </aside>
          </FadeIn>
        </div>
      </section>

      {/* ----------------------------------------------------------- language */}
      <section className="relative px-4 pb-16 sm:px-6 sm:pb-20">
        <FadeIn y={40}>
          <div className="relative mx-auto grid w-full max-w-[1200px] overflow-hidden rounded-[32px] bg-[linear-gradient(145deg,#061225_0%,#0a1f3d_48%,#07293a_100%)] lg:grid-cols-[1.05fr_0.95fr]">
            <div
              className="pointer-events-none absolute inset-0 opacity-35"
              style={{
                backgroundImage:
                  'url(https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=60)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                maskImage: 'linear-gradient(90deg, transparent, black 45%)',
              }}
              aria-hidden
            />
            <span className="pointer-events-none absolute -top-20 start-1/4 size-72 rounded-full bg-[radial-gradient(circle,rgb(26_99_216/0.45),transparent_70%)] blur-3xl" aria-hidden />

            <div className="relative z-[1] p-7 sm:p-10 lg:p-12">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[12px] font-medium text-white/85 backdrop-blur-sm">
                <PulseDot className="size-1.5" />
                {p.langBadge}
              </span>
              <h2 className="display mt-5 text-[clamp(1.65rem,1.2rem+1.6vw,2.4rem)] tracking-[-0.03em] text-white">
                {p.langTitle}
              </h2>
              <p className="mt-4 max-w-lg text-[14.5px] leading-relaxed text-white/70">{p.langBody}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {p.dialects.map((d, i) => (
                  <motion.span
                    key={d.en}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.08 * i, duration: 0.4, ease: EASE }}
                    className="rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[13px] text-white/90 backdrop-blur-sm"
                  >
                    <span className="font-medium">{d.ar}</span>
                    <span className="text-white/50"> · {d.en}</span>
                  </motion.span>
                ))}
              </div>
              <p className="mt-3 text-[13px] text-white/55">{p.langMore}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <DemoBtn label={p.langDemo} className="w-full sm:w-auto" />
                <WaBtn label={p.langWa} className="w-full sm:w-auto" />
              </div>
              <p className="mt-3 text-[12.5px] text-white/45">{p.langHint}</p>
            </div>

            <div className="relative z-[1] p-5 sm:p-7 lg:p-8">
              <div className="relative overflow-hidden rounded-[24px] shadow-[0_30px_60px_-28px_rgb(0_0_0/0.55)]">
                <img src={p.langImage} alt="" className="aspect-[4/5] w-full object-cover" loading="lazy" />
                <motion.div
                  className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/20 bg-night/80 p-3.5 backdrop-blur-md sm:inset-x-5 sm:bottom-5 sm:p-4"
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.55, ease: EASE }}
                >
                  <p className="caps flex items-center gap-1.5 text-[10px] text-aqua">
                    <PulseDot className="size-1.5" />
                    Voice call · Arabic
                  </p>
                  <motion.p
                    className="mt-2 rounded-xl bg-white/10 px-3 py-2 text-[12.5px] leading-snug text-white/80"
                    dir="rtl"
                    initial={reduce ? false : { opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35, duration: 0.4 }}
                  >
                    مرحباً، أبي أحجز كيكة ليوم الجمعة لو سمحت
                  </motion.p>
                  <motion.p
                    className="mt-2 max-w-[90%] rounded-xl bg-brand px-3 py-2 text-[12.5px] leading-snug text-white"
                    dir="rtl"
                    initial={reduce ? false : { opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.55, duration: 0.4 }}
                  >
                    أكيد. لأي مناسبة؟ وأبغى الاسم يُكتب على الكيكة؟
                  </motion.p>
                </motion.div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  )
}
