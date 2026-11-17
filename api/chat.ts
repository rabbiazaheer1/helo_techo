import type { VercelRequest, VercelResponse } from '@vercel/node'

import { generateChatReply, type ChatAiEnv } from '../src/shared/chatAi'
import type { ChatTurn } from '../src/shared/chatKnowledge'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const body = req.body
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    res.status(400).json({ error: 'Send a JSON object with messages.' })
    return
  }

  const payload = body as { messages?: unknown; locale?: unknown }
  const messages = payload.messages
  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: 'messages must be a non-empty array.' })
    return
  }

  const locale = payload.locale === 'ar' ? 'ar' : 'en'

  const turns: ChatTurn[] = messages
    .filter((m): m is ChatTurn => !!m && typeof m === 'object' && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map((m) => ({ role: m.role, content: m.content }))

  const env: ChatAiEnv = {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  }

  try {
    const reply = await generateChatReply(turns, env, locale)
    res.status(200).json({ ok: true, reply })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Chat failed'
    if (message === 'MISSING_API_KEY') {
      res.status(503).json({
        error: 'AI chatbot is not configured yet. Add GEMINI_API_KEY or OPENAI_API_KEY in Vercel env.',
      })
      return
    }
    res.status(502).json({ error: 'The assistant could not reply right now. Please try again.' })
  }
}
