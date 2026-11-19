import { useEffect } from 'react'

import { SITE } from '../data'

/**
 * Official HeyServo launcher:
 * <script src="https://admin-api.heyservo.ai/widget.js" data-key="pk_live_…" defer></script>
 *
 * `pk_live_…` is HeyServo’s public widget key (required in the script tag).
 * Reads VITE_HEYSERVO_PUBLIC_KEY when set, falling back to SITE.heyservoPublicKey.
 */
const SCRIPT_SRC = 'https://admin-api.heyservo.ai/widget.js'
const KEY_RE = /^pk_live_[A-Za-z0-9_-]{20,64}$/

declare global {
  interface Window {
    HeyServoWidget?: {
      publicKey: string
      open: () => void
      destroy: () => void
    }
  }
}

let injected = false

function publicKey() {
  return (import.meta.env.VITE_HEYSERVO_PUBLIC_KEY || SITE.heyservoPublicKey || '').trim()
}

export function HeyServoWidget() {
  useEffect(() => {
    const key = publicKey()
    if (!KEY_RE.test(key)) {
      console.warn('[heyservo] Missing or invalid public widget key (pk_live_…).')
      return
    }
    if (injected || window.HeyServoWidget) return
    if (document.querySelector(`script[src="${SCRIPT_SRC}"][data-key]`)) {
      injected = true
      return
    }

    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.async = true
    script.defer = true
    script.dataset.key = key
    script.onerror = () => {
      injected = false
      script.remove()
    }
    document.body.appendChild(script)
    injected = true
  }, [])

  return null
}
