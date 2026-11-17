import { useEffect, useState } from 'react'

import { LOGO_SRC, Mark, Wordmark } from './Logo'
import { ChannelMark, SOCIALS } from './Social'
import { PulseDot } from './Ui'

/**
 * The hero visual: brand mark in the middle of a slow orbit of every social
 * channel we answer on.
 */
export function HeroOrbit() {
  const [png, setPng] = useState(false)
  const count = SOCIALS.length

  useEffect(() => {
    let alive = true
    const img = new Image()
    img.onload = () => {
      if (alive) setPng(true)
    }
    img.src = LOGO_SRC
    return () => {
      alive = false
    }
  }, [])

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[min(100%,340px)] sm:max-w-[440px] lg:max-w-[520px]">
      <div
        className="absolute inset-[3%] rounded-[28px] border border-white/90 bg-white/55 shadow-[var(--shadow-float)] backdrop-blur-xl sm:rounded-[46px]"
        aria-hidden
      />
      <div
        className="absolute inset-[12%] animate-float-slow rounded-full opacity-70 blur-2xl motion-reduce:animate-none"
        style={{ background: 'radial-gradient(circle at 40% 35%, #dbeafe, #e9e3ff 52%, #d7f6f4)' }}
        aria-hidden
      />
      <div className="absolute inset-[9%] rounded-full border border-line/70" aria-hidden />
      <div className="absolute inset-[18%] rounded-full border border-dashed border-brand/20" aria-hidden />

      {/* Social marks orbiting the logo */}
      <div className="orbit absolute inset-[6%] motion-reduce:animate-none" aria-hidden>
        {SOCIALS.map((kind, i) => {
          const angle = (360 / count) * i
          const rad = (angle * Math.PI) / 180
          return (
            <span
              key={kind}
              className="absolute"
              style={{
                left: `${50 + Math.cos(rad) * 44}%`,
                top: `${50 + Math.sin(rad) * 44}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <span className="orbit-counter block motion-reduce:animate-none">
                <ChannelMark
                  kind={kind}
                  className="size-7 shadow-[0_12px_24px_-12px_rgb(9_30_74/0.55)] sm:size-9 lg:size-10"
                  glyphClassName="size-3 sm:size-3.5 lg:size-4"
                  rounded="rounded-full"
                />
              </span>
            </span>
          )
        })}
      </div>

      {/* Brand centre */}
      <div className="absolute inset-[18%] grid place-items-center sm:inset-[21%]">
        {png ? (
          <img
            src={LOGO_SRC}
            alt="Hello Techno"
            className="max-h-full w-auto max-w-full object-contain drop-shadow-[0_18px_32px_rgb(11_58_156/0.18)]"
          />
        ) : (
          <div className="flex flex-col items-center gap-3 rounded-[28px] bg-white/95 px-6 py-6 shadow-[0_20px_40px_-24px_rgb(9_30_74/0.45)] backdrop-blur-sm sm:gap-4 sm:px-8 sm:py-8">
            <Mark className="size-[5.5rem] drop-shadow-[0_14px_28px_rgb(11_58_156/0.28)] sm:size-28" glow />
            <Wordmark size="lg" />
          </div>
        )}
      </div>

      <ul className="sr-only" aria-label="Social channels we answer on">
        {SOCIALS.map((kind) => (
          <li key={kind}>{kind}</li>
        ))}
      </ul>

      <div className="absolute bottom-[1%] left-1/2 w-[min(92%,20rem)] -translate-x-1/2 rounded-[14px] border border-white bg-white/95 px-2.5 py-2 shadow-[0_20px_40px_-26px_rgb(9_30_74/0.55)] sm:w-[80%] sm:rounded-[16px] sm:px-3">
        <div className="flex items-center justify-between gap-2">
          <span className="flex min-w-0 items-center gap-1.5 text-[11px] font-medium text-ink sm:text-[12px]">
            <PulseDot className="size-1.5" />
            <span className="truncate">AI Employee · online</span>
          </span>
          <span className="shrink-0 text-[10px] font-medium text-success sm:text-[11px]">Booking confirmed ✓</span>
        </div>
      </div>
    </div>
  )
}
