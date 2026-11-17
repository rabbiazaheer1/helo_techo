import { useEffect, useId, useState } from 'react'

import { cx } from '../lib/cx'

/**
 * Hello Techno mark — brain mesh + signal + handset, high-contrast for small sizes.
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
          <stop offset="0" stopColor="#3b82f6" />
          <stop offset="0.45" stopColor="#1a63d8" />
          <stop offset="1" stopColor="#0b3a9c" />
        </linearGradient>
        <linearGradient id={iris} x1="80" y1="8" x2="108" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#c4b5fd" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id={teal} x1="74" y1="72" x2="118" y2="116" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#5eead4" />
          <stop offset="1" stopColor="#0e9a9e" />
        </linearGradient>
        <radialGradient id={sheen} cx="34%" cy="24%" r="66%">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.42" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {glow && <circle cx="60" cy="60" r="56" fill={`url(#${teal})`} opacity="0.16" />}

      <circle cx="60" cy="60" r="52" fill="#eef4ff" />
      <circle cx="60" cy="60" r="50" fill={`url(#${blue})`} />

      <g fill={`url(#${blue})`}>
        <circle cx="44" cy="46" r="22" />
        <circle cx="66" cy="34" r="19" />
        <circle cx="86" cy="48" r="17" />
        <circle cx="60" cy="62" r="22" />
        <circle cx="40" cy="66" r="15" />
        <circle cx="78" cy="68" r="14" />
      </g>
      <circle cx="90" cy="32" r="13" fill={`url(#${iris})`} />
      <circle cx="40" cy="84" r="9" fill={`url(#${teal})`} />
      <circle cx="60" cy="60" r="34" fill={`url(#${sheen})`} />

      <g stroke="#ffffff" strokeOpacity="0.7" strokeWidth="1.8" strokeLinecap="round">
        {edges.map(([a, b]) => (
          <line key={`${a}-${b}`} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} />
        ))}
      </g>
      <g fill="#ffffff">
        {nodes.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="2.3" />
        ))}
      </g>

      <path
        d="M30 58h9l6-16 8 32 8-24 7 16 6-8h10"
        fill="none"
        stroke="#ffffff"
        strokeWidth="4.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M84 84c9 1 16 8 17 17"
        fill="none"
        stroke={`url(#${teal})`}
        strokeWidth="9"
        strokeLinecap="round"
      />
      <circle cx="84" cy="84" r="6.8" fill={`url(#${teal})`} />
      <circle cx="101" cy="101" r="6.8" fill={`url(#${teal})`} />
    </svg>
  )
}

/** Clear, readable wordmark — Hello / Techno stacked. */
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
        'flex flex-col leading-[0.95]',
        size === 'sm' && 'text-[1.05rem]',
        size === 'md' && 'text-[1.35rem]',
        size === 'lg' && 'text-[1.95rem]',
        className,
      )}
    >
      <span
        className={cx(
          'font-[family-name:var(--font-display)] font-semibold tracking-[-0.04em]',
          light
            ? 'text-white drop-shadow-[0_1px_8px_rgb(0_0_0/0.25)]'
            : 'bg-[linear-gradient(100deg,#0b3a9c,#1a63d8_55%,#2563eb)] bg-clip-text text-transparent',
        )}
        aria-hidden
      >
        Hello
      </span>
      <span
        className={cx(
          'mt-[0.08em] font-[family-name:var(--font-display)] text-[0.82em] font-semibold tracking-[-0.02em]',
          light ? 'text-[#7DE8E2]' : 'text-teal',
        )}
        aria-hidden
      >
        Techno
      </span>
      <span className="sr-only">Hello Techno</span>
    </span>
  )
}

export const LOGO_SRC = '/images/hello-techno-logo.png'

/**
 * Site brand. Uses the clear vector lockup by default; upgrades to the PNG
 * only after it successfully loads from /images/hello-techno-logo.png.
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
  const [png, setPng] = useState(false)

  useEffect(() => {
    let alive = true
    const img = new Image()
    img.onload = () => {
      if (alive) setPng(true)
    }
    img.onerror = () => {
      if (alive) setPng(false)
    }
    img.src = LOGO_SRC
    return () => {
      alive = false
    }
  }, [])

  const lockupSize = size === 'xs' ? 'sm' : size
  const lockup = (
    <BrandLockup
      size={lockupSize}
      light={onDarkPlate ? false : light}
      className={!onDarkPlate ? className : undefined}
      compact={size === 'xs'}
    />
  )

  if (!png) {
    if (onDarkPlate) {
      return (
        <span
          className={cx(
            'inline-flex items-center rounded-2xl bg-white shadow-[0_10px_24px_-18px_rgb(9_30_74/0.45)]',
            size === 'xs' ? 'px-2 py-1.5' : 'px-3 py-2',
            className,
          )}
        >
          {lockup}
        </span>
      )
    }
    return lockup
  }

  const img = (
    <img
      src={LOGO_SRC}
      alt="Hello Techno"
      className={cx(
        'block w-auto object-contain',
        size === 'xs' && 'h-8',
        size === 'sm' && 'h-12',
        size === 'md' && 'h-14',
        size === 'lg' && 'h-20',
        !onDarkPlate && className,
      )}
    />
  )

  if (onDarkPlate) {
    return <span className={cx('inline-flex items-center rounded-2xl bg-white px-3 py-2', className)}>{img}</span>
  }
  return img
}

export function BrandLockup({
  className,
  size = 'md',
  light = false,
  compact = false,
}: {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  light?: boolean
  compact?: boolean
}) {
  const markClass =
    size === 'lg' ? 'size-[3.25rem]' : size === 'md' ? 'size-11' : compact ? 'size-8' : 'size-10'

  return (
    <span className={cx('inline-flex items-center', compact ? 'gap-2' : 'gap-2.5', className)}>
      <Mark className={cx(markClass, 'drop-shadow-[0_8px_16px_rgb(11_58_156/0.22)]')} />
      <Wordmark size={size} light={light} />
    </span>
  )
}
