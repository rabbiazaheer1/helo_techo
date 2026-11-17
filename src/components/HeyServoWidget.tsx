import { useEffect } from 'react'

import { SITE } from '../data'

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

/** Loads the HeyServo chat launcher (https://admin-api.heyservo.ai/widget.js). */
export function HeyServoWidget() {
  useEffect(() => {
    const key = SITE.heyservoPublicKey
    if (!KEY_RE.test(key)) return

    if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return

    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.async = true
    script.dataset.key = key
    document.body.appendChild(script)

    return () => {
      window.HeyServoWidget?.destroy()
      script.remove()
      document.getElementById('heyservo-widget-host')?.remove()
      delete window.HeyServoWidget
    }
  }, [])

  return null
}
