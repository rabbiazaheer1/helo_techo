import { ArrowRight, ArrowUpRight, Check, Mail, Phone, Shield, Sparkles, Star } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'

import { ContactForm } from '../components/ContactForm'
import { Diagram } from '../components/Diagram'
import { HeroOrbit } from '../components/HeroOrbit'
import { Brand } from '../components/Logo'
import { ChannelMark, SocialRow } from '../components/Social'
import { Accordion, Btn, CountUp, PulseDot, Reveal, SectionHead } from '../components/Ui'
import {
  CAPABILITIES,
  CHANNELS,
  CREDIT_NOTES,
  DEMO,
  FAQ,
  HERO,
  INDUSTRIES,
  INTEGRATIONS,
  PLANS,
  RESULTS,
  SITE,
} from '../data'
import { cx } from '../lib/cx'

/* ------------------------------------------------------------------- hero */

function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-8 sm:pt-28 lg:pt-32 lg:pb-10">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 grid-lines opacity-60 [mask-image:radial-gradient(ellipse_at_50%_0%,#000,transparent_72%)]" />
        <div className="absolute -top-32 -left-24 size-[min(100vw,520px)] animate-drift rounded-full bg-[radial-gradient(circle,#cfe2ff,transparent_65%)] blur-2xl motion-reduce:animate-none" />
        <div className="absolute -top-20 right-0 size-[min(90vw,460px)] animate-drift rounded-full bg-[radial-gradient(circle,#e3dbff,transparent_65%)] blur-2xl motion-reduce:animate-none" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-0 left-1/3 size-[min(80vw,420px)] animate-drift rounded-full bg-[radial-gradient(circle,#d3f5f2,transparent_65%)] blur-2xl motion-reduce:animate-none" style={{ animationDelay: '6s' }} />
      </div>

      <div className="mx-auto grid w-full max-w-[1320px] items-center gap-8 px-4 sm:gap-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div>
          <Reveal>
            <span className="caps inline-flex max-w-full items-center gap-2 rounded-full border border-line bg-white/80 py-1.5 pr-3.5 pl-2 text-brand">
              <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand-soft">
                <Sparkles className="size-3" aria-hidden />
              </span>
              <span className="truncate">Your Business Communication Partner</span>
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="display mt-5 text-[clamp(2.05rem,1.05rem+4vw,4.6rem)] text-ink sm:mt-6">
              Be there. <span className="rainbow-text">Be responsive.</span> Be unforgettable.
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-5 max-w-xl text-[clamp(0.98rem,0.94rem+0.28vw,1.16rem)] leading-relaxed text-muted sm:mt-6">
              {HERO.lead}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mt-3 max-w-xl text-[13.5px] leading-relaxed text-faint sm:text-[14.5px]">{HERO.body}</p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-7 flex flex-wrap items-center gap-2.5 sm:mt-8 sm:gap-3">
              <Btn href="#contact" size="lg" className="max-sm:w-full" iconRight={<ArrowRight className="size-4 transition-transform duration-[var(--duration-base)] group-hover/btn:translate-x-0.5" aria-hidden />}>
                {HERO.primary}
              </Btn>
              <Btn href={SITE.phoneHref} variant="outline" size="lg" className="max-sm:min-w-0 max-sm:flex-1">
                <span className="flex items-center gap-2">
                  <Phone className="size-4" aria-hidden />
                  <span className="truncate">{SITE.phone}</span>
                </span>
              </Btn>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Chat with us on WhatsApp at ${SITE.phone}`}
                className="grid size-12 shrink-0 place-items-center rounded-full border border-line bg-white/80 transition-[transform,box-shadow] duration-[var(--duration-fast)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)] sm:size-14"
              >
                <ChannelMark kind="whatsapp" className="size-8 sm:size-9" glyphClassName="size-4 sm:size-5" rounded="rounded-full" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mt-4 text-[12.5px] text-faint">
              Or email{' '}
              <a href={`mailto:${SITE.email}`} className="font-medium text-brand underline decoration-brand/25 underline-offset-4 hover:decoration-brand">
                {SITE.email}
              </a>
            </p>
          </Reveal>

          <Reveal delay={0.36}>
            <dl className="mt-8 grid max-w-lg grid-cols-2 gap-x-4 gap-y-4 border-t border-line pt-6 sm:mt-9 sm:grid-cols-4 sm:gap-x-6">
              {HERO.proof.map((p) => (
                <div key={p.label}>
                  <dt className="text-[1.05rem] leading-none font-semibold tracking-[-0.03em] text-ink sm:text-[1.15rem]">{p.value}</dt>
                  <dd className="mt-1.5 text-[11px] leading-tight text-muted sm:text-[11.5px]">{p.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.42}>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <span className="caps text-[10px] text-faint">Answers on</span>
              <SocialRow itemClassName="size-8" className="gap-1.5" label="Channels we answer on" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="relative">
          <HeroOrbit />
        </Reveal>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- channels */

function ChannelStrip() {
  return (
    <section className="relative border-y border-line bg-white/70 py-8 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
          <p className="caps max-w-[16rem] shrink-0 text-muted">
            Every channel your customers use, <span className="rainbow-text">one queue</span>
          </p>
          <div className="marquee-mask flex-1 overflow-hidden">
            <ul className="flex w-max animate-marquee items-center gap-3 hover:[animation-play-state:paused] motion-reduce:animate-none">
              {[...CHANNELS, ...CHANNELS].map((c, i) => (
                <li
                  key={`${c.name}-${i}`}
                  aria-hidden={i >= CHANNELS.length || undefined}
                  className="flex items-center gap-2.5 rounded-full border border-line bg-white px-3 py-2 whitespace-nowrap shadow-[0_8px_20px_-18px_rgb(9_30_74/0.5)] transition-[transform,box-shadow] duration-[var(--duration-base)] hover:-translate-y-0.5 hover:shadow-[0_14px_26px_-18px_rgb(9_30_74/0.5)]"
                >
                  <ChannelMark kind={c.kind} className="size-7" glyphClassName="size-3.5" rounded="rounded-full" />
                  <span className="text-[13.5px] font-medium text-ink">{c.name}</span>
                  <span className="text-[11.5px] text-faint">{c.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line/70 pt-5">
          <span className="caps mr-1 text-[10px] text-faint">Connects to</span>
          {INTEGRATIONS.map((name) => (
            <span key={name} className="rounded-md bg-soft/70 px-2 py-1 text-[11.5px] font-medium text-muted">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------- capabilities */

function Platform() {
  return (
    <section id="platform" className="relative mx-auto w-full max-w-[1320px] px-4 py-12 sm:px-6 lg:py-16">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <SectionHead
            align="left"
            eyebrow="What we build"
            accent="#1A63D8"
            title={<>The AI layer under every customer conversation.</>}
            body="An agent answers and stops. Hello Techno runs the layer underneath: intake across six channels, knowledge scoped per location and per language, real actions in your PMS or CRM through scoped credentials, escalation rules your team writes, and one-click takeover. Everything on the record, from day one."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <Btn href="#contact" variant="solid" iconRight={<ArrowRight className="size-4" aria-hidden />}>
              {HERO.primary}
            </Btn>
            <Btn href="#how-it-works" variant="ghost">
              See the platform
            </Btn>
          </div>
        </Reveal>

        <div className="grid gap-3 sm:grid-cols-2">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.title} delay={0.05 * i}>
              <article className="group relative h-full overflow-hidden rounded-[22px] border border-line bg-white/80 p-5 transition-[transform,box-shadow,border-color] duration-[var(--duration-base)] ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-brand/30 hover:shadow-[var(--shadow-card)]">
                <span
                  className="pointer-events-none absolute -top-16 -right-10 size-32 rounded-full bg-[radial-gradient(circle,#dbeafe,transparent_70%)] opacity-0 transition-opacity duration-[var(--duration-slow)] group-hover:opacity-100"
                  aria-hidden
                />
                <span
                  className="relative grid size-10 place-items-center rounded-[12px]"
                  style={{ background: `${c.accent}16`, color: c.accent }}
                >
                  <c.icon className="size-5" aria-hidden />
                </span>
                <span
                  className="absolute inset-x-0 top-0 h-0.5 opacity-0 transition-opacity duration-[var(--duration-base)] group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, ${c.accent}, transparent)` }}
                  aria-hidden
                />
                <h3 className="relative mt-4 text-[1.02rem] font-semibold tracking-[-0.025em] text-ink">{c.title}</h3>
                <p className="relative mt-2 text-[13.5px] leading-relaxed text-muted">{c.body}</p>
                <p className="relative mt-3 flex items-center gap-1.5 text-[11.5px] font-medium" style={{ color: c.accent }}>
                  <Check className="size-3.5" aria-hidden />
                  {c.note}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------- industries */

function Industries() {
  const [active, setActive] = useState(0)
  const industry = INDUSTRIES[active]

  return (
    <section id="industries" className="relative overflow-hidden bg-white/60 py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6">
        <Reveal>
          <SectionHead
            eyebrow="Vertical playbooks"
            accent="#6F4BF2"
            title={<>Built for your industry, not everyone’s.</>}
            body="The platform is the same. The knowledge, procedures, connectors and language of your operation are not. Each industry gets its own build."
          />
        </Reveal>

        <Reveal delay={0.08}>
          <div
            className="hide-scrollbar mt-9 -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 touch-pan-x sm:mx-0 sm:px-0"
            role="tablist"
            aria-label="Industries"
          >
            {INDUSTRIES.map((item, i) => (
              <button
                key={item.key}
                type="button"
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className={cx(
                  'inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2.5 text-[13px] font-medium transition-[background-color,color,border-color,box-shadow,transform] duration-[var(--duration-fast)] hover:-translate-y-0.5 sm:px-4 sm:text-[13.5px]',
                  active === i
                    ? 'border-transparent text-white shadow-[0_14px_30px_-18px_rgb(9_30_74/0.55)]'
                    : 'bg-white/70',
                )}
                style={
                  active === i
                    ? { background: item.accent }
                    : { borderColor: `${item.accent}44`, color: item.accent }
                }
              >
                <item.icon className="size-4" aria-hidden />
                {item.name}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="relative mt-6 min-h-0 lg:min-h-[26rem]">
          {/* Keyed on purpose: a new key remounts the panel and re-runs the
              entrance animation, without AnimatePresence's exit handshake. */}
          <motion.div
            key={industry.key}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-3 lg:grid-cols-[0.85fr_1.15fr]"
          >
              <div
                className="flex flex-col justify-between rounded-[26px] border border-line p-6 sm:p-8"
                style={{ background: `linear-gradient(160deg,#ffffff,${industry.tint})` }}
              >
                <div>
                  <p className="caps" style={{ color: industry.accent }}>{industry.tagline}</p>
                  <h3 className="display mt-3 text-[clamp(1.5rem,1.1rem+1.4vw,2.2rem)] text-ink">{industry.name}</h3>
                  <div className="mt-6 space-y-4">
                    <div>
                      <p className="caps text-[10px] text-faint">The pain</p>
                      <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">{industry.pain}</p>
                    </div>
                    <div>
                      <p className="caps text-[10px]" style={{ color: industry.accent }}>The win</p>
                      <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-2">{industry.win}</p>
                    </div>
                  </div>
                </div>
                <Btn href="#contact" variant="outline" size="md" className="mt-7 self-start">
                  See it on your operation
                </Btn>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {industry.uses.map((use, i) => (
                  <article
                    key={use.title}
                    className={cx(
                      'group relative overflow-hidden rounded-[22px] border border-line bg-white p-5 transition-[transform,box-shadow] duration-[var(--duration-base)] hover:-translate-y-1 hover:shadow-[var(--shadow-card)]',
                      i === 0 && 'sm:col-span-2',
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h4 className="text-[1rem] font-semibold tracking-[-0.02em] text-ink">{use.title}</h4>
                      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                        <ArrowUpRight className="size-3.5" aria-hidden />
                      </span>
                    </div>
                    <p className="mt-2 max-w-lg text-[13.5px] leading-relaxed text-muted">{use.body}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
                      {['Voice', 'WhatsApp', 'Web'].map((channel) => (
                        <span
                          key={channel}
                          className="rounded-md px-1.5 py-0.5 text-[10px] font-semibold tracking-[0.06em] uppercase"
                          style={{ background: `${industry.accent}14`, color: industry.accent }}
                        >
                          {channel}
                        </span>
                      ))}
                      <span className="ml-auto flex items-center gap-1.5 text-[11.5px] font-medium text-success">
                        <PulseDot className="size-1.5" />
                        {use.result}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- results */

function Results() {
  const accents = ['#25D366', '#8B7CFF', '#F59E0B', '#45D4E8'] as const

  return (
    <section id="results" className="relative mx-auto w-full max-w-[1320px] px-4 py-12 sm:px-6 lg:py-16">
      <div className="on-dark relative overflow-hidden rounded-[24px] bg-night px-5 py-10 text-white sm:rounded-[34px] sm:px-10 sm:py-12 lg:px-14 lg:py-16">
        <div
          className="pointer-events-none absolute -top-32 -right-24 size-[min(100vw,560px)] animate-drift rounded-full opacity-60 blur-3xl motion-reduce:animate-none"
          style={{ background: 'radial-gradient(circle, #1a63d8 0%, #6f4bf2 45%, transparent 72%)' }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-40 -left-24 size-[min(90vw,480px)] animate-drift rounded-full opacity-40 blur-3xl motion-reduce:animate-none"
          style={{ background: 'radial-gradient(circle, #0e9a9e 0%, transparent 70%)', animationDelay: '4s' }}
          aria-hidden
        />

        <div className="relative flex flex-col gap-10">
          <Reveal>
            <SectionHead
              align="center"
              tone="light"
              eyebrow="The business case"
              title={RESULTS.title}
              body={RESULTS.body}
              className="mx-auto max-w-3xl"
            />
            <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
              {['Scoped credentials', 'Auditable actions', 'Human in the loop'].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-[12px] text-white/80"
                >
                  <Shield className="size-3.5" aria-hidden />
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {RESULTS.stats.map((stat, i) => {
                const accent = accents[i % accents.length]
                return (
                  <div
                    key={stat.label}
                    className="group relative overflow-hidden rounded-[20px] border border-white/12 p-5 backdrop-blur-sm transition-transform duration-[var(--duration-base)] hover:-translate-y-1 sm:p-6"
                    style={{ background: `linear-gradient(150deg, ${accent}28, rgb(255 255 255 / 0.05) 62%)` }}
                  >
                    <span
                      className="absolute inset-x-0 top-0 h-0.5"
                      style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
                      aria-hidden
                    />
                    <dt className="display text-[clamp(2rem,1.4rem+2.2vw,3rem)]" style={{ color: accent }}>
                      {/^[1-9]\d*$/.test(stat.value) ? <CountUp value={Number(stat.value)} /> : stat.value}
                    </dt>
                    <dd className="mt-2.5 max-w-[16ch] text-[12.5px] leading-snug text-night-muted sm:text-[13px]">
                      {stat.label}
                    </dd>
                  </div>
                )
              })}
            </dl>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="overflow-hidden rounded-[18px] border border-white/12 bg-white/[0.05]">
              <div className="marquee-mask">
                <ul className="flex w-max animate-marquee items-center gap-6 py-3.5 hover:[animation-play-state:paused] motion-reduce:animate-none">
                  {[...RESULTS.proofLines, ...RESULTS.proofLines, ...RESULTS.proofLines].map((line, i) => (
                    <li key={`${line}-${i}`} className="flex items-center gap-2 text-[12.5px] whitespace-nowrap text-white/75">
                      <Check className="size-3.5 text-teal" aria-hidden />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- pricing */

function Pricing() {
  return (
    <section id="pricing" className="relative bg-white/60 py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6">
        <Reveal>
          <SectionHead
            eyebrow="Simple monthly plans"
            accent="#0E9A9E"
            title={<>The same four plans for every industry.</>}
            body="Hotels, clinics, restaurants, dealerships and growing businesses all run on the same plans and the same credit rate: one credit covers twenty messages, and a call minute costs two. Start with 50 free credits at zero setup cost."
          />
        </Reveal>

        <div className="mt-11 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.name} delay={0.05 * i} className="h-full">
              <article
                className={cx(
                  'relative flex h-full flex-col overflow-hidden rounded-[26px] p-6 transition-[transform,box-shadow] duration-[var(--duration-base)] hover:-translate-y-1',
                  plan.featured
                    ? 'bg-[linear-gradient(160deg,#0b2a63,#0b3a9c_45%,#0b6f88)] text-white shadow-[var(--shadow-float)]'
                    : 'border border-line bg-white text-ink shadow-[0_18px_40px_-34px_rgb(9_30_74/0.45)]',
                )}
              >
                {plan.featured && (
                  <>
                    <span className="pointer-events-none absolute -top-24 -right-16 size-56 rounded-full bg-[radial-gradient(circle,rgb(111_75_242/0.55),transparent_70%)] blur-2xl" aria-hidden />
                    <span className="absolute top-5 right-5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold tracking-[0.1em] uppercase">
                      Recommended
                    </span>
                  </>
                )}
                <span
                  className="absolute inset-x-0 top-0 h-1"
                  style={{
                    background: plan.featured
                      ? 'linear-gradient(90deg,#8B7CFF,#E1306C,#F59E0B,#0E9A9E)'
                      : plan.accent,
                  }}
                  aria-hidden
                />
                <h3 className={cx('mt-2 text-[1.05rem] font-semibold tracking-[-0.02em]', plan.featured ? 'text-white' : 'text-ink')}>
                  {plan.name}
                </h3>
                <p className={cx('mt-1.5 min-h-[2.6rem] text-[12.5px] leading-snug', plan.featured ? 'text-white/70' : 'text-muted')}>
                  {plan.blurb}
                </p>

                <div className="mt-5 flex items-end gap-1.5">
                  <span className="display text-[2.3rem]" style={{ color: plan.featured ? '#ffffff' : plan.accent }}>
                    {plan.price}
                  </span>
                  <span className={cx('pb-1 text-[12.5px]', plan.featured ? 'text-white/60' : 'text-faint')}>
                    {plan.per}
                  </span>
                </div>
                <p className={cx('mt-1 text-[11.5px]', plan.featured ? 'text-white/60' : 'text-faint')}>
                  {plan.price === 'Custom'
                    ? 'Scope and volume sized with you'
                    : `${plan.currency} · ≈ $${Math.round(Number(plan.price) / 3.64)}`}
                </p>

                <div className={cx('mt-4 rounded-[12px] px-3 py-2', plan.featured ? 'bg-white/10' : 'bg-soft/80')}>
                  <p className={cx('text-[11.5px] font-semibold', plan.featured ? 'text-white' : 'text-ink')}>{plan.estimate}</p>
                  <p className={cx('mt-0.5 text-[10.5px]', plan.featured ? 'text-white/60' : 'text-faint')}>{plan.credits}</p>
                </div>

                <ul className="mt-4 flex-1 space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2 text-[12.5px] leading-snug">
                      <Check className="mt-0.5 size-3.5 shrink-0" style={{ color: plan.featured ? '#7DE8E2' : plan.accent }} aria-hidden />
                      <span className={plan.featured ? 'text-white/80' : 'text-muted'}>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={cx(
                    'mt-6 flex h-11 items-center justify-center gap-2 rounded-full text-[13.5px] font-medium transition-[background-color,transform] duration-[var(--duration-fast)] active:scale-[0.98]',
                    plan.featured
                      ? 'bg-white text-brand-deep hover:bg-white/90'
                      : 'border border-line-strong text-ink hover:border-brand hover:text-brand',
                  )}
                >
                  {plan.price === 'Custom' ? 'Talk to sales' : 'Start a free trial'}
                  <ArrowRight className="size-4" aria-hidden />
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-6 grid gap-3 rounded-[22px] border border-line bg-white/70 p-5 sm:grid-cols-2 lg:grid-cols-4">
            {CREDIT_NOTES.map((note) => (
              <div key={note.value} className="flex flex-col">
                <span className="text-[13.5px] font-semibold text-ink">{note.value}</span>
                <span className="text-[11.5px] text-muted">{note.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------------- faq */

function Faq() {
  return (
    <section id="faq" className="relative mx-auto w-full max-w-[1320px] px-4 py-12 sm:px-6 lg:py-16">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <SectionHead
            align="left"
            eyebrow="Direct questions, direct answers"
            accent="#F59E0B"
            title={<>Everything a buyer asks in the first call.</>}
            body="If it is not here, ask us directly — a person answers, not a form autoresponder."
          />
          <div className="mt-7 space-y-2.5">
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 text-[14px] font-medium text-brand hover:text-brand-deep">
              <Mail className="size-4" aria-hidden />
              {SITE.email}
            </a>
            <a href={SITE.phoneHref} className="flex items-center gap-2 text-[14px] font-medium text-brand hover:text-brand-deep">
              <Phone className="size-4" aria-hidden />
              {SITE.phone}
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <Accordion items={FAQ} />
        </Reveal>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- contact */

function Contact() {
  return (
    <section id="contact" className="relative px-4 pb-6 sm:px-6">
      <div className="on-dark relative mx-auto w-full max-w-[1320px] overflow-hidden rounded-[24px] bg-[linear-gradient(150deg,#061225,#081b3a_48%,#07293a)] px-5 py-10 text-white sm:rounded-[34px] sm:px-10 sm:py-12 lg:px-14 lg:py-16">
        <div
          className="pointer-events-none absolute -top-40 left-1/4 size-[min(100vw,600px)] animate-drift rounded-full opacity-50 blur-3xl motion-reduce:animate-none"
          style={{ background: 'radial-gradient(circle, #1a63d8 0%, #6f4bf2 48%, transparent 72%)' }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-20 -bottom-40 size-[min(90vw,520px)] animate-drift rounded-full opacity-40 blur-3xl motion-reduce:animate-none"
          style={{ background: 'radial-gradient(circle, #0e9a9e 0%, transparent 70%)', animationDelay: '5s' }}
          aria-hidden
        />

        <div className="relative grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <div>
            <Reveal>
              <span className="caps inline-flex items-center gap-2 text-white/60">
                <span className="h-px w-6 bg-white/40" aria-hidden />
                Book a demo
              </span>
              <h2 className="display mt-4 max-w-[16ch] text-[clamp(2rem,1.2rem+2.6vw,3.4rem)] text-white">{DEMO.title}</h2>
              <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-night-muted">{DEMO.body}</p>
              <ul className="mt-6 space-y-2.5">
                {DEMO.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2.5 text-[13.5px] text-white/80">
                    <span className="grid size-5 place-items-center rounded-full bg-teal/20 text-teal">
                      <Check className="size-3" aria-hidden />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="caps text-[10px] text-white/40">Answers on</span>
                <SocialRow itemClassName="size-8" className="gap-1.5" label="Channels we answer on" />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                <a
                  href={`mailto:${SITE.email}`}
                  className="group flex items-center gap-3 rounded-[16px] border border-white/12 bg-white/[0.05] p-3 transition-colors hover:border-white/30 sm:col-span-2 lg:col-span-1"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/10 text-white">
                    <Mail className="size-4" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10.5px] tracking-[0.08em] text-white/45 uppercase">Email</span>
                    <span className="block truncate text-[12.5px] font-medium text-white">{SITE.email}</span>
                  </span>
                </a>
                <a
                  href={SITE.phoneHref}
                  className="group flex items-center gap-3 rounded-[16px] border border-white/12 bg-white/[0.05] p-3 transition-colors hover:border-white/30"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/10 text-white">
                    <Phone className="size-4" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10.5px] tracking-[0.08em] text-white/45 uppercase">Phone</span>
                    <span className="block truncate text-[12.5px] font-medium text-white">{SITE.phone}</span>
                  </span>
                </a>
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`Chat with us on WhatsApp at ${SITE.phone}`}
                  className="group flex items-center gap-3 rounded-[16px] border border-white/12 bg-white/[0.05] p-3 transition-colors hover:border-white/30"
                >
                  <ChannelMark kind="whatsapp" className="size-9" glyphClassName="size-4" rounded="rounded-full" />
                  <span className="min-w-0">
                    <span className="block text-[10.5px] tracking-[0.08em] text-white/45 uppercase">WhatsApp</span>
                    <span className="block truncate text-[12.5px] font-medium text-white">{SITE.phone}</span>
                  </span>
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-4 flex items-center gap-3 rounded-[16px] border border-white/12 bg-white/[0.04] p-3">
                <Brand size="xs" light onDarkPlate />
                <div className="ml-auto text-right">
                  <p className="flex items-center justify-end gap-1.5 text-[11.5px] text-teal">
                    <Star className="size-3" aria-hidden />
                    AI on your channels 24/7
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------- page */

export function Home() {
  return (
    <main id="main">
      <Hero />
      <ChannelStrip />
      <Diagram />
      <Platform />
      <Industries />
      <Results />
      <Pricing />
      <Faq />
      <Contact />
    </main>
  )
}
