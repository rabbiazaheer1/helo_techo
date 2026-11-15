import { Hono } from 'hono'

import { validateContact, type FieldErrors } from '../shared/validation'

// The Worker in front of the static site. /api/contact validates the demo
// request and returns a reference; connect it to email, a CRM or a D1 table
// to keep the requests. Everything else falls through to the built assets.
type Env = {
  ASSETS: Fetcher
}

const app = new Hono<{ Bindings: Env }>()

const reference = () => `HT-${Math.random().toString(36).slice(2, 8).toUpperCase()}`

async function readBody(req: Request): Promise<Record<string, unknown> | null> {
  try {
    const body = await req.json()
    return body && typeof body === 'object' && !Array.isArray(body) ? (body as Record<string, unknown>) : null
  } catch {
    return null
  }
}

const invalid = (fieldErrors: FieldErrors) =>
  Response.json({ error: 'Please check the highlighted fields.', fieldErrors }, { status: 422 })

app.get('/api/health', (c) => c.json({ ok: true }))

app.post('/api/contact', async (c) => {
  const body = await readBody(c.req.raw)
  if (!body) return Response.json({ error: 'Send a JSON object.' }, { status: 400 })

  const errors = validateContact(body)
  if (Object.keys(errors).length) return invalid(errors)

  return c.json({ ok: true, reference: reference() }, 201)
})

app.all('/api/*', (c) => c.json({ error: 'Not found' }, 404))

app.all('*', (c) => c.env.ASSETS.fetch(c.req.raw))

export default app
