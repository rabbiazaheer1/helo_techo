import {
  ArrowRight,
  ArrowUpRight,
  ChartColumn,
  Bell,
  Brain,
  Calendar,
  Check,
  Clock,
  Database,
  Lightbulb,
  MessageSquare,
  Phone,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'
import { motion } from 'motion/react'
import type { ReactNode } from 'react'

import { cx } from '../lib/cx'
import { Mark } from './Logo'
import { ChannelMark, type ChannelKey } from './Social'
import { PulseDot, Reveal } from './Ui'

/* ------------------------------------------------------------------ atoms */

function Panel({
  n,
  title,
  sub,
  tone,
  arrow = false,
  children,
}: {
  n: string
  title: string
  sub: string
  tone: 'blue' | 'iris' | 'teal'
  arrow?: boolean
  children: ReactNode
}) {
  return (
    <div
      className={cx(
        'relative flex h-full flex-col overflow-hidden rounded-[26px] border p-4 shadow-[0_20px_50px_-34px_rgb(9_30_74/0.35)] sm:p-5',
        tone === 'blue' && 'border-[#cfe0fb] bg-[linear-gradient(168deg,#f8fbff,#e9f2ff_70%,#e4efff)]',
        tone === 'iris' && 'border-[#ded4ff] bg-[linear-gradient(168deg,#fbfaff,#f0ecff_70%,#eae6ff)]',
        tone === 'teal' && 'border-[#c6ebe9] bg-[linear-gradient(168deg,#f8fffe,#e7f8f7_70%,#dff5f4)]',
      )}
    >
      <div className="relative flex items-start gap-3">
        <span
          className={cx(
            'grid size-9 shrink-0 place-items-center rounded-full text-sm font-semibold text-white shadow-[0_10px_20px_-10px_rgb(9_30_74/0.6)]',
            tone === 'blue' && 'bg-[linear-gradient(140deg,#2b7fe0,#12479f)]',
            tone === 'iris' && 'bg-[linear-gradient(140deg,#7c5cf5,#4c2bc4)]',
            tone === 'teal' && 'bg-[linear-gradient(140deg,#14b5b0,#0a7d86)]',
          )}
        >
          {n}
        </span>
        <div className="min-w-0">
          <h3 className="text-[1.06rem] leading-tight font-semibold tracking-[-0.03em] text-ink">{title}</h3>
          <p className="mt-0.5 text-[12.5px] leading-snug text-muted">{sub}</p>
        </div>
      </div>
      <div className="relative mt-4 flex flex-1 flex-col">{children}</div>
      {arrow && (
        <span className="absolute top-1/2 -right-3 z-10 hidden size-7 -translate-y-1/2 place-items-center rounded-full bg-white text-brand shadow-[0_8px_20px_-8px_rgb(9_30_74/0.45)] ring-1 ring-line lg:grid">
          <ArrowRight className="size-3.5" aria-hidden />
        </span>
      )}
    </div>
  )
}

function MiniCard({
  icon,
  title,
  note,
  check = false,
  accent = '#1A63D8',
  className,
  children,
}: {
  icon?: ReactNode
  title: string
  note?: string
  check?: boolean
  accent?: string
  className?: string
  children?: ReactNode
}) {
  return (
    <div
      className={cx(
        'rounded-[14px] border border-white/90 bg-white/95 px-2.5 py-2 shadow-[0_10px_24px_-18px_rgb(9_30_74/0.5)] transition-[transform,box-shadow] duration-[var(--duration-base)] ease-[var(--ease-out-soft)] hover:-translate-y-0.5 hover:shadow-[0_18px_32px_-20px_rgb(9_30_74/0.55)]',
        className,
      )}
    >
      <div className="flex items-center gap-2">
        {icon && (
          <span
            className="grid size-7 shrink-0 place-items-center rounded-[9px]"
            style={{ background: `${accent}16`, color: accent }}
          >
            {icon}
          </span>
        )}
        <p className="min-w-0 flex-1 text-[12.5px] leading-tight font-medium text-ink">{title}</p>
        {check && <Check className="size-3.5 shrink-0 text-success" aria-hidden />}
      </div>
      {note && <p className="mt-1 text-[11px] leading-snug text-faint">{note}</p>}
      {children}
    </div>
  )
}

function LiveTag({ children = 'Live' }: { children?: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-medium tracking-[0.04em] text-success uppercase">
      <PulseDot className="size-1.5" />
      {children}
    </span>
  )
}

/* --------------------------------------------------------------- panel 1 */

function UnifiedPanel() {
  const channels: { icon: ReactNode; title: string; meta: string; accent: string }[] = [
    {
      icon: (
        <span className="grid grid-cols-3 gap-px">
          {(['whatsapp', 'instagram', 'email'] as ChannelKey[]).map((kind) => (
            <ChannelMark key={kind} kind={kind} className="size-[11px] rounded-[3px] shadow-none" glyphClassName="size-[7px]" />
          ))}
        </span>
      ),
      title: 'Messaging',
      meta: 'WhatsApp · Instagram · Gmail',
      accent: '#E1306C',
    },
    { icon: <Phone className="size-4" />, title: 'Voice / Call', meta: 'Your own numbers', accent: '#1A63D8' },
    { icon: <MessageSquare className="size-4" />, title: 'Web chat & SMS', meta: 'Every page, every hour', accent: '#7C5CF5' },
  ]

  return (
    <Panel
      n="1"
      title="Unified Communication"
      sub="All your channels. One AI. Seamless conversations."
      tone="blue"
      arrow
    >
      <div className="grid flex-1 grid-cols-1 items-center gap-2 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <div className="flex flex-col gap-1.5">
          {channels.map((c) => (
            <MiniCard key={c.title} icon={c.icon} title={c.title} note={c.meta} accent={c.accent} />
          ))}
        </div>

        <div className="relative mx-auto grid w-[172px] shrink-0 place-items-center py-1">
          <div className="absolute size-[168px] rounded-full bg-[radial-gradient(circle_at_32%_26%,#e6f0ff,#efe9ff_58%,#dff7f5)]" aria-hidden />
          <div className="absolute size-[168px] rounded-full border border-white/80" aria-hidden />
          <div className="absolute size-[150px] animate-spin-slower rounded-full border border-dashed border-brand/25" aria-hidden />
          <div className="absolute size-[124px] animate-spin-slow rounded-full border border-dashed border-teal/30" aria-hidden />
          <motion.div
            className="relative grid place-items-center"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Mark className="size-[104px] drop-shadow-[0_16px_24px_rgb(11_58_156/0.28)]" />
          </motion.div>
          <span className="absolute top-4 -right-1 rounded-full bg-[linear-gradient(135deg,#1a63d8,#6f4bf2)] px-2 py-0.5 text-[10px] font-semibold tracking-[0.1em] text-white shadow">
            AI
          </span>
          <div className="mt-2 flex items-end gap-[3px]" aria-hidden>
            {[0.35, 0.7, 0.5, 0.9, 0.6, 0.4, 0.75].map((h, i) => (
              <span
                key={i}
                className="w-[3px] origin-bottom animate-wave rounded-full bg-brand/60"
                style={{ height: `${h * 18}px`, animationDelay: `${i * 0.12}s` }}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <MiniCard accent="#6F4BF2" icon={<Calendar className="size-4" />} title="Bookings" note="Confirmed" check />
          <MiniCard accent="#F59E0B" icon={<Clock className="size-4" />} title="Appointments" note="Scheduled" check />
          <MiniCard accent="#0E9A9E" icon={<Bell className="size-4" />} title="Reminders" note="Sent" check />
        </div>
      </div>
      <p className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[12px] font-medium text-ink-2">
        <span className="font-semibold">AI Employee</span>
        <span className="text-faint" aria-hidden>•</span>
        <span className="text-muted">Understands</span>
        <span className="text-faint" aria-hidden>•</span>
        <span className="text-muted">Replies</span>
        <span className="text-faint" aria-hidden>•</span>
        <span className="text-muted">Takes action</span>
      </p>
    </Panel>
  )
}

/* --------------------------------------------------------------- panel 2 */

function Hub() {
  return (
    <div className="relative grid size-[124px] place-items-center">
      <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_40%_35%,#f0eaff,#e7f6ff)]" aria-hidden />
      <span className="absolute inset-0 animate-pulse-ring rounded-full border border-iris/40" aria-hidden />
      <span className="absolute inset-2 animate-spin-slow rounded-full border border-dashed border-iris/35" aria-hidden />
      <span className="relative grid size-16 place-items-center rounded-full bg-[linear-gradient(140deg,#6f4bf2,#1a63d8)] text-white shadow-[0_16px_30px_-14px_rgb(111_75_242/0.8)]">
        <Brain className="size-7" aria-hidden />
      </span>
      <span className="mt-2 text-[10px] font-semibold tracking-[0.12em] text-iris uppercase">AI</span>
    </div>
  )
}

function UnifiedPanelDots() {
  return (
    <svg className="pointer-events-none absolute inset-0 size-full" viewBox="0 0 400 260" preserveAspectRatio="none" aria-hidden>
      {[
        'M20 40 Q 120 60 200 130',
        'M20 130 Q 110 130 200 130',
        'M20 220 Q 120 200 200 130',
        'M200 130 Q 300 60 380 40',
        'M200 130 Q 300 130 380 130',
        'M200 130 Q 300 200 380 220',
      ].map((d, i) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke="rgb(26 99 216 / 0.28)"
          strokeWidth="1.6"
          strokeDasharray="5 7"
          className="animate-dash"
          style={{ animationDelay: `${i * 0.35}s` }}
        />
      ))}
    </svg>
  )
}

function ConnectedPanel() {
  return (
    <Panel
      n="2"
      title="Fast, Connected Intelligence"
      sub="Real-time context. Smarter decisions. In seconds."
      tone="iris"
      arrow
    >
      <div className="relative flex-1">
        <UnifiedPanelDots />
        <div className="relative grid gap-1.5 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
          <div className="flex flex-col gap-1.5">
            <MiniCard icon={<Calendar className="size-4" />} title="Bookings & appointments" note="Held and confirmed">
              <div className="mt-1.5 space-y-1" aria-hidden>
                <span className="block h-1 w-full rounded-full bg-iris/15" />
                <span className="block h-1 w-3/4 rounded-full bg-iris/25" />
              </div>
              <div className="mt-1.5"><LiveTag /></div>
            </MiniCard>
            <MiniCard icon={<Sparkles className="size-4" />} title="Sentiment analysis" note="Happy · neutral · at risk">
              <svg viewBox="0 0 80 38" className="mt-1 w-full" aria-hidden>
                <path d="M6 32a34 34 0 0 1 68 0" fill="none" stroke="#e3ddfb" strokeWidth="6" strokeLinecap="round" />
                <path d="M6 32a34 34 0 0 1 56-24" fill="none" stroke="#14b5b0" strokeWidth="6" strokeLinecap="round" strokeDasharray="0 200">
                  <animate attributeName="stroke-dasharray" from="0 200" to="70 200" dur="1.4s" fill="freeze" />
                </path>
                <circle cx="40" cy="32" r="2.6" fill="#0b3a9c" />
              </svg>
              <div className="mt-1"><LiveTag /></div>
            </MiniCard>
          </div>

          <div className="grid place-items-center px-1 py-2 sm:py-0">
            <Hub />
          </div>

          <div className="flex flex-col gap-1.5">
            <MiniCard icon={<MessageSquare className="size-4" />} title="Customer chats" note="One thread per guest">
              <div className="mt-1.5 space-y-1" aria-hidden>
                <span className="ml-auto block h-3 w-4/5 rounded-full rounded-br-sm bg-brand/15" />
                <span className="block h-3 w-3/5 rounded-full rounded-bl-sm bg-iris/15" />
              </div>
              <div className="mt-1.5"><LiveTag /></div>
            </MiniCard>
            <MiniCard icon={<Users className="size-4" />} title="Customer history" note="Every past visit, in context">
              <div className="mt-1.5 flex gap-1" aria-hidden>
                {['#dbe7fb', '#e6e0ff', '#d7f2f1'].map((c) => (
                  <span key={c} className="h-1 flex-1 rounded-full" style={{ background: c }} />
                ))}
              </div>
              <div className="mt-1.5"><LiveTag /></div>
            </MiniCard>
            <MiniCard icon={<Bell className="size-4" />} title="Escalations" note="Straight to your team">
              <div className="mt-1"><LiveTag /></div>
            </MiniCard>
          </div>
        </div>

        <div className="relative mt-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full bg-[linear-gradient(100deg,#6f4bf2,#3f5ce4)] px-3 py-1.5 text-center text-white shadow-[0_12px_26px_-14px_rgb(111_75_242/0.9)]">
          <Clock className="size-3.5 shrink-0" aria-hidden />
          <span className="text-[15px] leading-none font-semibold tabular-nums">1 to 4</span>
          <span className="text-[11px] leading-tight">seconds average reply time</span>
        </div>

        <div className="relative mt-2 rounded-[16px] border border-white/90 bg-white/80 p-2.5">
          <p className="caps text-[10px] tracking-[0.1em] text-brand">Connected to your business systems</p>
          <div className="mt-1.5 grid grid-cols-3 gap-1.5">
            {[
              { name: 'OPERA', sub: 'Oracle PMS', icon: <Database className="size-3.5" /> },
              { name: 'F&B', sub: 'Symphony', icon: <ChartColumn className="size-3.5" /> },
              { name: 'ERP', sub: 'Business ops', icon: <Zap className="size-3.5" /> },
            ].map((s) => (
              <div key={s.name} className="flex items-center gap-1.5 rounded-[10px] border border-line bg-white px-1.5 py-1.5">
                <span className="grid size-6 shrink-0 place-items-center rounded-md bg-iris-soft text-iris">{s.icon}</span>
                <span className="min-w-0">
                  <span className="block truncate text-[10.5px] leading-tight font-semibold text-ink">{s.name}</span>
                  <span className="block truncate text-[9.5px] leading-tight text-faint">{s.sub}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  )
}

/* --------------------------------------------------------------- panel 3 */

function FlowCard({ icon, title, note }: { icon: ReactNode; title: string; note: string }) {
  return (
    <div className="flex flex-col items-center rounded-[14px] border border-white bg-white/95 px-2 py-2.5 text-center shadow-[0_10px_24px_-20px_rgb(9_30_74/0.5)]">
      <span className="grid size-8 place-items-center rounded-full bg-teal-soft text-teal">{icon}</span>
      <p className="mt-1.5 text-[11.5px] leading-tight font-semibold text-ink">{title}</p>
      <p className="mt-0.5 text-[9.5px] leading-snug text-faint">{note}</p>
    </div>
  )
}

function RoleCard({
  title,
  metric,
  delta,
  children,
  accent,
}: {
  title: string
  metric: string
  delta: string
  accent: string
  children: ReactNode
}) {
  return (
    <div className="rounded-[12px] border border-white bg-white/95 p-2 shadow-[0_10px_24px_-20px_rgb(9_30_74/0.5)]">
      <p className="text-[9.5px] leading-tight font-semibold" style={{ color: accent }}>{title}</p>
      <p className="mt-1 text-[15px] leading-none font-semibold text-ink tabular-nums">{metric}</p>
      <p className="mt-0.5 text-[9px] leading-tight text-success">▲ {delta}</p>
      <div className="mt-1.5">{children}</div>
    </div>
  )
}

function SavedPanel() {
  return (
    <Panel
      n="3"
      title="Saved, Analyzed, Delivered"
      sub="Turn conversations into insights and action."
      tone="teal"
    >
      <div className="grid items-center gap-1 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
        <FlowCard icon={<Database className="size-4" />} title="Secure data storage" note="All interactions & customer data" />
        <ArrowRight className="mx-auto hidden size-3.5 text-teal sm:block" aria-hidden />
        <FlowCard icon={<Brain className="size-4" />} title="AI analytics" note="Finds patterns and opportunities" />
        <ArrowRight className="mx-auto hidden size-3.5 text-teal sm:block" aria-hidden />
        <FlowCard icon={<TrendingUp className="size-4" />} title="Intelligent reports" note="Sent to the team that acts" />
      </div>

      <div className="mt-2 grid grid-cols-2 gap-1.5">
        <RoleCard title="Owner · Business performance" metric="$24,850" delta="12%" accent="#0b3a9c">
          <div className="flex h-6 items-end gap-[2px]" aria-hidden>
            {[0.3, 0.45, 0.35, 0.6, 0.5, 0.8, 1].map((h, i) => (
              <span key={i} className="flex-1 rounded-sm bg-brand/70" style={{ height: `${h * 100}%` }} />
            ))}
          </div>
        </RoleCard>
        <RoleCard title="Manager · Team & service" metric="96%" delta="4%" accent="#6f4bf2">
          <div className="flex items-center gap-1.5">
            <span
              className="grid size-7 place-items-center rounded-full text-[8px] font-semibold text-iris"
              style={{ background: 'conic-gradient(#6f4bf2 0 88%, #ece6ff 88% 100%)' }}
              aria-hidden
            >
              <span className="grid size-5 place-items-center rounded-full bg-white">88</span>
            </span>
            <span className="text-[9px] leading-tight text-faint">Guest satisfaction</span>
          </div>
        </RoleCard>
        <RoleCard title="Operations · Daily" metric="248" delta="6%" accent="#0e9a9e">
          <svg viewBox="0 0 60 22" className="w-full" aria-hidden>
            <path d="M1 18 L10 12 L19 15 L28 7 L37 11 L46 4 L59 6" fill="none" stroke="#14b5b0" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </RoleCard>
        <RoleCard title="Marketing · Growth" metric="8.4%" delta="2.1%" accent="#c2410c">
          <div className="flex h-6 items-end gap-[2px]" aria-hidden>
            {[0.25, 0.4, 0.35, 0.55, 0.7, 1].map((h, i) => (
              <span key={i} className="flex-1 rounded-sm bg-[#f59e0b]/60" style={{ height: `${h * 100}%` }} />
            ))}
          </div>
        </RoleCard>
      </div>

      <div className="mt-2 flex items-center justify-center gap-2 rounded-full bg-teal-soft/80 px-3 py-1.5">
        <Lightbulb className="size-3.5 text-teal" aria-hidden />
        <p className="text-[11px] font-medium text-teal-deep">Better insights. Happier guests. More growth.</p>
      </div>
    </Panel>
  )
}

/* ------------------------------------------------------------------ export */

const FOOTER_FEATURES = [
  { icon: <MessageSquare className="size-4" />, label: 'More conversations' },
  { icon: <Zap className="size-4" />, label: 'Faster responses' },
  { icon: <ChartColumn className="size-4" />, label: 'Smarter decisions' },
  { icon: <Sparkles className="size-4" />, label: 'Happier customers' },
]

export function Diagram() {
  return (
    <section id="how-it-works" className="relative mx-auto w-full max-w-[1320px] px-4 py-12 sm:px-6 lg:py-16">
      <Reveal className="flex flex-col items-center text-center">
        <span className="caps inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-3.5 py-1.5 text-brand">
          <Sparkles className="size-3.5" aria-hidden />
          The platform in three moves
        </span>
        <h2 className="display mt-6 text-[clamp(1.9rem,1.1rem+3.4vw,3.9rem)] text-ink">
          AI-Powered <span className="rainbow-text">Customer Communication</span>
        </h2>
        <p className="mt-4 max-w-xl text-[clamp(1rem,0.95rem+0.25vw,1.15rem)] text-muted">
          Be there. Be responsive. Be unforgettable.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-3 lg:grid-cols-3">
        <Reveal delay={0.05} className="h-full">
          <UnifiedPanel />
        </Reveal>
        <Reveal delay={0.15} className="h-full">
          <ConnectedPanel />
        </Reveal>
        <Reveal delay={0.25} className="h-full">
          <SavedPanel />
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-line pt-6">
          {FOOTER_FEATURES.map((f, i) => (
            <li key={f.label} className="flex items-center gap-8">
              <span className="flex items-center gap-2 text-[13.5px] font-medium text-ink-2">
                <span className="text-brand">{f.icon}</span>
                {f.label}
              </span>
              {i < FOOTER_FEATURES.length - 1 && <span className="hidden h-4 w-px bg-line-strong sm:block" aria-hidden />}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.15} className="mt-8 flex justify-center">
        <a
          href="#contact"
          className="group inline-flex items-center gap-2 text-[13.5px] font-medium text-brand transition-colors hover:text-brand-deep"
        >
          See this running on your own channels
          <ArrowUpRight className="size-4 transition-transform duration-[var(--duration-base)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
        </a>
      </Reveal>
    </section>
  )
}
