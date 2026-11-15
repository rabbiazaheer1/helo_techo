import { useState } from 'react'

import { BrandLockup } from './Logo'
import { ChannelMark, SOCIALS } from './Social'
import { PulseDot } from './Ui'

export const LOGO_SRC = '/images/hello-techno-logo.png'

/**
 * The hero visual: the supplied logo, untouched, held in the middle of a slow
 * orbit of every social platform we answer on.
 */
export function HeroOrbit() {
  const [logoOk, setLogoOk] = useState(true)
  const count = SOCIALS.length

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      <div
        className="absolute inset-[3%] rounded-[46px] border border-white/90 bg-white/55 shadow-[var(--shadow-float)] backdrop-blur-xl"
        aria-hidden
      />
      <div
        className="absolute inset-[12%] animate-float-slow rounded-full opacity-70 blur-2xl"
        style={{ background: 'radial-gradient(circle at 40% 35%, #dbeafe, #e9e3ff 52%, #d7f6f4)' }}
        aria-hidden
      />
      <div className="absolute inset-[9%] rounded-full border border-line/70" aria-hidden />
      <div className="absolute inset-[18%] rounded-full border border-dashed border-brand/20" aria-hidden />

      {/* Social marks orbiting the logo */}
      <div className="orbit absolute inset-[6%]" aria-hidden>
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
              <span className="orbit-counter block">
                <ChannelMark
                  kind={kind}
                  className="size-10 shadow-[0_12px_24px_-12px_rgb(9_30_74/0.55)]"
                  glyphClassName="size-4"
                  rounded="rounded-full"
                />
              </span>
            </span>
          )
        })}
      </div>

      {/* The logo, as supplied */}
      <div className="absolute inset-[21%] grid place-items-center">
        {logoOk ? (
          <img
            src={LOGO_SRC}
            alt="Hello Techno"
            onError={() => setLogoOk(false)}
            className="max-h-full w-auto max-w-full object-contain drop-shadow-[0_18px_32px_rgb(11_58_156/0.18)]"
          />
        ) : (
          <BrandLockup size="lg" />
        )}
      </div>

      <ul className="sr-only" aria-label="Social channels we answer on">
        {SOCIALS.map((kind) => (
          <li key={kind}>{kind}</li>
        ))}
      </ul>

      <div className="absolute bottom-[1%] left-1/2 w-[80%] -translate-x-1/2 rounded-[16px] border border-white bg-white/95 px-3 py-2 shadow-[0_20px_40px_-26px_rgb(9_30_74/0.55)]">
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-1.5 text-[12px] font-medium text-ink">
            <PulseDot className="size-1.5" />
            AI Employee · online
          </span>
          <span className="text-[11px] font-medium text-success">Booking confirmed ✓</span>
        </div>
      </div>
    </div>
  )
}
