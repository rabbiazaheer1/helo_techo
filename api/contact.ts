import type { VercelRequest, VercelResponse } from '@vercel/node'

import { validateContact } from '../src/shared/validation'

const reference = () => `HT-${Math.random().toString(36).slice(2, 8).toUpperCase()}`

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const body = req.body
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    res.status(400).json({ error: 'Send a JSON object.' })
    return
  }

  const fieldErrors = validateContact(body as Record<string, unknown>)
  if (Object.keys(fieldErrors).length) {
    res.status(422).json({ error: 'Please check the highlighted fields.', fieldErrors })
    return
  }

  res.status(201).json({ ok: true, reference: reference() })
}
