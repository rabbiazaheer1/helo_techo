import { Mail, MessageCircle, MessageSquare, Phone } from 'lucide-react'
import type { IconType } from 'react-icons'
import { FaLinkedin } from 'react-icons/fa6'
import {
  SiFacebook,
  SiInstagram,
  SiSnapchat,
  SiTelegram,
  SiThreads,
  SiTiktok,
  SiWhatsapp,
  SiX,
  SiYoutube,
} from 'react-icons/si'

import { cx } from '../lib/cx'

export type ChannelKey =
  | 'whatsapp'
  | 'instagram'
  | 'facebook'
  | 'x'
  | 'voice'
  | 'web'
  | 'sms'
  | 'email'
  | 'linkedin'
  | 'tiktok'
  | 'youtube'
  | 'snapchat'
  | 'telegram'
  | 'threads'

type Brand = {
  label: string
  color: string
  /** Full tile background, when the brand is a gradient (Instagram). */
  tile?: string
  glyph: IconType
  /** Snapchat's yellow tile needs a dark glyph. */
  darkGlyph?: boolean
}

export const BRANDS: Record<ChannelKey, Brand> = {
  whatsapp: { label: 'WhatsApp', color: '#25D366', glyph: SiWhatsapp },
  instagram: {
    label: 'Instagram',
    color: '#E1306C',
    tile: 'linear-gradient(45deg,#f9ce34 0%,#ee2a7b 48%,#6228d7 100%)',
    glyph: SiInstagram,
  },
  facebook: { label: 'Facebook', color: '#1877F2', glyph: SiFacebook },
  x: { label: 'X', color: '#0F1419', glyph: SiX },
  voice: { label: 'Voice calls', color: '#1A63D8', glyph: Phone },
  web: { label: 'Web chat', color: '#0E9A9E', glyph: MessageSquare },
  sms: { label: 'SMS', color: '#F59E0B', glyph: MessageCircle },
  email: { label: 'Email', color: '#EA4335', glyph: Mail },
  linkedin: { label: 'LinkedIn', color: '#0A66C2', glyph: FaLinkedin },
  tiktok: { label: 'TikTok', color: '#010101', glyph: SiTiktok },
  youtube: { label: 'YouTube', color: '#FF0033', glyph: SiYoutube },
  snapchat: { label: 'Snapchat', color: '#FFFC00', glyph: SiSnapchat, darkGlyph: true },
  telegram: { label: 'Telegram', color: '#26A5E4', glyph: SiTelegram },
  threads: { label: 'Threads', color: '#0F1419', glyph: SiThreads },
}

export function brandColor(kind: ChannelKey) {
  return BRANDS[kind].color
}

/** A brand-coloured tile holding the real platform mark. */
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

/** The social platforms the platform answers on. Badges, not profile links. */
export const SOCIALS: ChannelKey[] = [
  'whatsapp',
  'instagram',
  'facebook',
  'x',
  'tiktok',
  'linkedin',
  'youtube',
  'snapchat',
  'threads',
  'telegram',
]

/** A row of platform marks with their names available to assistive tech. */
export function SocialRow({
  kinds = SOCIALS,
  className,
  itemClassName,
  label = 'Social channels',
}: {
  kinds?: ChannelKey[]
  className?: string
  itemClassName?: string
  label?: string
}) {
  return (
    <ul className={cx('flex flex-wrap items-center gap-2', className)} aria-label={label}>
      {kinds.map((kind) => (
        <li key={kind} title={BRANDS[kind].label}>
          <span className="sr-only">{BRANDS[kind].label}</span>
          <span
            className={cx(
              'group/mark grid size-9 place-items-center rounded-full transition-[transform,box-shadow] duration-[var(--duration-base)] ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:shadow-[0_14px_24px_-12px_rgb(9_30_74/0.45)]',
              itemClassName,
            )}
            style={{ background: BRANDS[kind].tile ?? BRANDS[kind].color }}
            aria-hidden
          >
            {(() => {
              const Glyph = BRANDS[kind].glyph
              return (
                <Glyph
                  className={cx('size-4', BRANDS[kind].darkGlyph ? 'text-[#101418]' : 'text-white')}
                />
              )
            })()}
          </span>
        </li>
      ))}
    </ul>
  )
}
