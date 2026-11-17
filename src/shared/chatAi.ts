import { CHAT_SYSTEM_PROMPT, type ChatTurn } from './chatKnowledge'

export type ChatAiEnv = {
  GEMINI_API_KEY?: string
  OPENAI_API_KEY?: string
}

function normalizeTurns(messages: ChatTurn[]): ChatTurn[] {
  return messages
    .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map((m) => ({ role: m.role, content: m.content.trim().slice(0, 4000) }))
    .filter((m) => m.content.length > 0)
    .slice(-16)
}

const GEMINI_MODELS = ['gemini-3.8-flash', 'gemini-3.5-flash-lite', 'gemini-flash-latest'] as const

async function replyWithGemini(key: string, messages: ChatTurn[]): Promise<string> {
  const contents = messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))

  const payload = {
    systemInstruction: { parts: [{ text: CHAT_SYSTEM_PROMPT }] },
    contents,
    generationConfig: { temperature: 0.55, maxOutputTokens: 500 },
  }

  let lastError = 'Gemini request failed'
  for (const model of GEMINI_MODELS) {
    const url =
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=` +
      encodeURIComponent(key)

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const errText = await res.text().catch(() => '')
      lastError = `Gemini error ${res.status}: ${errText.slice(0, 200)}`
      continue
    }

    const data = (await res.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[]
    }
    const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text ?? '').join('').trim()
    if (text) return text
    lastError = 'Empty Gemini response'
  }

  throw new Error(lastError)
}

async function replyWithOpenAI(key: string, messages: ChatTurn[]): Promise<string> {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      temperature: 0.55,
      max_tokens: 500,
      messages: [{ role: 'system', content: CHAT_SYSTEM_PROMPT }, ...messages],
    }),
  })

  if (!res.ok) {
    const errText = await res.text().catch(() => '')
    throw new Error(`OpenAI error ${res.status}: ${errText.slice(0, 200)}`)
  }

  const data = (await res.json()) as { choices?: { message?: { content?: string } }[] }
  const text = data.choices?.[0]?.message?.content?.trim()
  if (!text) throw new Error('Empty OpenAI response')
  return text
}

/** Generates an assistant reply using Gemini (preferred) or OpenAI. */
export async function generateChatReply(rawMessages: ChatTurn[], env: ChatAiEnv): Promise<string> {
  const messages = normalizeTurns(rawMessages)
  if (!messages.length) throw new Error('No messages')
  if (messages[messages.length - 1]?.role !== 'user') throw new Error('Last message must be from the user')

  if (env.GEMINI_API_KEY) return replyWithGemini(env.GEMINI_API_KEY, messages)
  if (env.OPENAI_API_KEY) return replyWithOpenAI(env.OPENAI_API_KEY, messages)
  throw new Error('MISSING_API_KEY')
}
