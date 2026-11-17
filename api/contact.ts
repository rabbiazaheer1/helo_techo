import { validateContact } from '../src/shared/validation'

export const config = { runtime: 'edge' }

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  })
}

const reference = () => `HT-${Math.random().toString(36).slice(2, 8).toUpperCase()}`

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405)
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Send a JSON object.' }, 400)
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return json({ error: 'Send a JSON object.' }, 400)
  }

  const fieldErrors = validateContact(body as Record<string, unknown>)
  if (Object.keys(fieldErrors).length) {
    return json({ error: 'Please check the highlighted fields.', fieldErrors }, 422)
  }

  return json({ ok: true, reference: reference() }, 201)
}
