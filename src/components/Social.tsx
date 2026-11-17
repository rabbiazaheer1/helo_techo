import { MessageCircle, MessageSquare, Phone } from 'lucide-react'
import type { IconType } from 'react-icons'
import { SiGmail, SiInstagram, SiWhatsapp } from 'react-icons/si'

import { cx } from '../lib/cx'

export type ChannelKey = 'whatsapp' | 'voice' | 'web' | 'sms' | 'instagram' | 'email'

type Brand = {
  label: string
  color: string
  /** Full tile background, when the brand is a gradient (Instagram / Gmail). */
  tile?: string
  glyph: IconType
  darkGlyph?: boolean
}

export const BRANDS: Record<ChannelKey, Brand> = {
  whatsapp: { label: 'WhatsApp', color: '#25D366', glyph: SiWhatsapp },
  voice: { label: 'Voice / Call', color: '#1A63D8', glyph: Phone },
  web: { label: 'Web chat', color: '#7C5CF5', glyph: MessageSquare },
  sms: { label: 'SMS', color: '#4DA3E8', glyph: MessageCircle },
  instagram: {
    label: 'Instagram',
    color: '#E1306C',
    tile: 'linear-gradient(45deg,#f9ce34 0%,#ee2a7b 48%,#6228d7 100%)',
    glyph: SiInstagram,
  },
  email: {
    label: 'Gmail',
    color: '#EA4335',
    tile: 'linear-gradient(135deg,#EA4335 0%,#FBBC05 40%,#34A853 70%,#4285F4 100%)',
    glyph: SiGmail,
  },
}

export function brandColor(kind: ChannelKey) {
  return BRANDS[kind].color
}

/** A brand-coloured tile holding the platform mark. */
export function ChannelMark({
  kind,
  className,
  glyphClassName,
  tone = 'solid',
  rounded = 'rounded-[10px]',
}: {
  kind: ChannelKey
  className?: string
  glyphClassName?: string
  tone?: 'solid' | 'soft'
  rounded?: string
}) {
  const brand = BRANDS[kind]
  const Glyph = brand.glyph

  if (tone === 'soft') {
    return (
      <span
        className={cx('grid shrink-0 place-items-center', rounded, className)}
        style={{ background: `${brand.color}18`, color: brand.color }}
      >
        <Glyph className={cx('size-4', glyphClassName)} aria-hidden />
      </span>
    )
  }

  return (
    <span
      className={cx(
        'grid shrink-0 place-items-center rounded-[10px] shadow-[0_10px_20px_-12px_rgb(9_30_74/0.65)]',
        rounded,
        className,
      )}
      style={{ background: brand.tile ?? brand.color, color: brand.darkGlyph ? '#101418' : undefined }}
    >
      <Glyph className={cx('size-4 text-white', brand.darkGlyph && 'text-[#101418]', glyphClassName)} aria-hidden />
    </span>
  )
}

/** The six channels Hello Techno answers on — used everywhere social icons appear. */
export const SOCIALS: ChannelKey[] = ['whatsapp', 'voice', 'web', 'sms', 'instagram', 'email']

/** A row of platform marks with their names available to assistive tech. */
export function SocialRow({
  kinds = SOCIALS,
  className,
  itemClassName,
  label = 'Channels we answer on',
  showLabels = false,
}: {
  kinds?: ChannelKey[]
  className?: string
  itemClassName?: string
  label?: string
  showLabels?: boolean
}) {
  return (
    <ul className={cx('flex flex-wrap items-center gap-2', className)} aria-label={label}>
      {kinds.map((kind) => (
        <li key={kind} title={BRANDS[kind].label} className={cx(showLabels && 'flex items-center gap-2')}>
          <span className="sr-only">{BRANDS[kind].label}</span>
          <span
            className={cx(
              'group/mark grid size-9 place-items-center rounded-full transition-[box-shadow] duration-[var(--duration-base)] ease-[var(--ease-out-soft)] hover:shadow-[0_14px_24px_-12px_rgb(9_30_74/0.45)]',
              itemClassName,
            )}
            style={{ background: BRANDS[kind].tile ?? BRANDS[kind].color }}
            aria-hidden
          >
            {(() => {
              const Glyph = BRANDS[kind].glyph
              return (
                <Glyph className={cx('size-4', BRANDS[kind].darkGlyph ? 'text-[#101418]' : 'text-white')} />
              )
            })()}
          </span>
          {showLabels && (
            <span className="text-[13px] font-medium text-ink-2">{BRANDS[kind].label}</span>
          )}
        </li>
      ))}
    </ul>
  )
}
