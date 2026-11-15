import { useId, useState } from 'react'

import { cx } from '../lib/cx'

/**
 * The Hello Techno mark: a network brain drawn as a mesh, a signal running
 * through it, and the handset swoosh in brand blue, iris and teal.
 */
export function Mark({ className, glow = false }: { className?: string; glow?: boolean }) {
  const raw = useId().replace(/[^a-zA-Z0-9]/g, '')
  const blue = `b${raw}`
  const iris = `i${raw}`
  const teal = `t${raw}`
  const sheen = `s${raw}`

  const nodes: [number, number][] = [
    [38, 40], [52, 30], [70, 28], [86, 40],
    [30, 56], [48, 52], [66, 50], [84, 56],
    [40, 70], [58, 68], [76, 70],
    [50, 84], [68, 84],
  ]

  const edges: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [0, 5], [1, 5], [2, 6], [3, 7],
    [4, 5], [5, 6], [6, 7], [4, 8], [5, 8], [6, 9], [7, 9],
    [8, 9], [8, 10], [9, 10], [8, 11], [9, 11], [10, 12], [11, 12], [9, 12],
  ]

  return (
    <svg viewBox="0 0 120 120" className={cx('shrink-0', className)} aria-hidden>
      <defs>
        <linearGradient id={blue} x1="12" y1="8" x2="96" y2="104" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1f6fd0" />
          <stop offset="0.55" stopColor="#1450b0" />
          <stop offset="1" stopColor="#0b2d7a" />
        </linearGradient>
        <linearGradient id={iris} x1="80" y1="8" x2="108" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#a78bfa" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id={teal} x1="74" y1="72" x2="118" y2="116" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#3fc9c0" />
          <stop offset="1" stopColor="#0d8fa3" />
        </linearGradient>
        <radialGradient id={sheen} cx="34%" cy="24%" r="66%">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.34" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {glow && <circle cx="60" cy="60" r="56" fill={`url(#${teal})`} opacity="0.12" />}

      {/* Brain silhouette, built from overlapping lobes. */}
      <g fill={`url(#${blue})`}>
        <circle cx="44" cy="46" r="24" />
        <circle cx="66" cy="34" r="21" />
        <circle cx="86" cy="48" r="19" />
        <circle cx="60" cy="62" r="24" />
        <circle cx="40" cy="66" r="17" />
        <circle cx="78" cy="68" r="15" />
      </g>
      <circle cx="90" cy="32" r="14" fill={`url(#${iris})`} />
      <circle cx="40" cy="84" r="9" fill={`url(#${teal})`} opacity="0.85" />
      <circle cx="60" cy="60" r="34" fill={`url(#${sheen})`} />

      {/* The mesh: white ribs and nodes across the brain. */}
      <g stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1.6" strokeLinecap="round">
        {edges.map(([a, b]) => (
          <line key={`${a}-${b}`} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} />
        ))}
      </g>
      <g fill="#ffffff" fillOpacity="0.85">
        {nodes.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="2.1" />
        ))}
      </g>

      {/* The signal running through. */}
      <path
        d="M30 58h9l6-16 8 32 8-24 7 16 6-8h10"
        fill="none"
        stroke="#ffffff"
        strokeWidth="4.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Handset swoosh. */}
      <path
        d="M84 84c9 1 16 8 17 17"
        fill="none"
        stroke={`url(#${teal})`}
        strokeWidth="9"
        strokeLinecap="round"
      />
      <circle cx="84" cy="84" r="6.6" fill={`url(#${teal})`} />
      <circle cx="101" cy="101" r="6.6" fill={`url(#${teal})`} />
    </svg>
  )
}

/** One of the two "o"s in the wordmark: a ring holding a signal. */
function SignalO({ size = 'md', light = false }: { size?: 'md' | 'sm'; light?: boolean }) {
  return (
    <span
      className={cx(
        'relative inline-grid shrink-0 place-items-center rounded-full',
        light
          ? 'bg-[linear-gradient(135deg,#4d8ce8,#63b9f0_55%,#3fc9c9)]'
          : 'bg-[linear-gradient(135deg,#1450b0,#2b8fd6_55%,#1a9fbd)]',
        size === 'md' ? 'size-[0.88em]' : 'size-[0.8em]',
      )}
    >
      <span className="flex items-end gap-[0.06em]" aria-hidden>
        {[0.34, 0.62, 0.46, 0.7, 0.38].map((h, i) => (
          <span
            key={i}
            className="w-[0.055em] rounded-full bg-white/95"
            style={{ height: `${h * 0.42}em` }}
          />
        ))}
      </span>
    </span>
  )
}

function MicO({ light = false }: { light?: boolean }) {
  return (
    <span
      className={cx(
        'relative inline-grid size-[0.86em] shrink-0 place-items-center rounded-full border-[0.09em]',
        light ? 'border-[#5fd8d0]' : 'border-teal',
      )}
    >
      <span className="flex flex-col items-center gap-[0.05em]" aria-hidden>
        <span className={cx('h-[0.2em] w-[0.13em] rounded-full', light ? 'bg-[#5fd8d0]' : 'bg-teal')} />
        <span
          className={cx(
            'h-[0.12em] w-[0.27em] rounded-b-full border-x-[0.05em] border-b-[0.05em]',
            light ? 'border-[#5fd8d0]' : 'border-teal',
          )}
        />
      </span>
    </span>
  )
}

/** "Hello" in brand blue over "Techno" in teal, with the signal circles. */
export function Wordmark({
  className,
  size = 'md',
  light = false,
}: {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  light?: boolean
}) {
  return (
    <span
      className={cx(
        'flex flex-col leading-none',
        size === 'sm' && 'text-[1.02rem]',
        size === 'md' && 'text-[1.28rem]',
        size === 'lg' && 'text-[1.9rem]',
        className,
      )}
    >
      <span className="flex items-center gap-[0.05em] font-semibold tracking-[-0.055em]" aria-hidden>
        <span
          className={cx(
            'bg-clip-text text-transparent',
            light
              ? 'bg-[linear-gradient(100deg,#a9cdff,#6fb0f5_60%,#8cc4ff)]'
              : 'bg-[linear-gradient(100deg,#12328f,#1f7fd4_70%,#2b8fd6)]',
          )}
        >
          Hell
        </span>
        <SignalO light={light} />
        <SignalO light={light} />
      </span>
      <span
        aria-hidden
        className={cx(
          'mt-[0.12em] flex items-center gap-[0.03em] text-[0.78em] font-medium tracking-[0.01em]',
          light ? 'text-[#5fd8d0]' : 'text-teal',
        )}
      >
        Techn
        <MicO light={light} />
      </span>
      <span className="sr-only">Hello Techno</span>
    </span>
  )
}

export const LOGO_SRC = '/images/hello-techno-logo.png'

/**
 * The supplied Hello Techno logo file. Until the PNG is saved to
 * `public/images/hello-techno-logo.png` the <img> fails and the vector mark
 * from this file is drawn instead, so the header and footer never break.
 */
export function Brand({
  size = 'md',
  light = false,
  className,
  onDarkPlate = false,
}: {
  size?: 'xs' | 'sm' | 'md' | 'lg'
  light?: boolean
  className?: string
  onDarkPlate?: boolean
}) {
  const [broken, setBroken] = useState(false)

  if (broken) return <BrandLockup size={size === 'xs' ? 'sm' : size} light={light} className={className} />

  const img = (
    <img
      src={LOGO_SRC}
      alt=""
      onError={() => setBroken(true)}
      className={cx(
        'block w-auto object-contain',
        size === 'xs' && 'h-7',
        size === 'sm' && 'h-11',
        size === 'md' && 'h-14',
        size === 'lg' && 'h-20',
        !onDarkPlate && className,
      )}
    />
  )

  // On the dark footer the supplied artwork needs a light plate to stay legible.
  if (onDarkPlate) {
    return <span className={cx('inline-flex items-center rounded-2xl bg-white px-3 py-2', className)}>{img}</span>
  }
  return img
}

export function BrandLockup({
  className,
  size = 'md',
  light = false,
}: {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  light?: boolean
}) {
  return (
    <span className={cx('inline-flex items-center gap-2.5', className)}>
      <Mark className={size === 'lg' ? 'size-14' : size === 'md' ? 'size-11' : 'size-9'} />
      <Wordmark size={size} light={light} />
    </span>
  )
}
