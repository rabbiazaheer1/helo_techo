import { LoaderCircle, Send, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react'

import { SITE } from '../data'
import { postJson } from '../lib/api'
import { cx } from '../lib/cx'
import { useLocale } from '../lib/locale'
import { Brand } from './Logo'
import { IconMessenger, IconPhone, IconWhatsApp } from './Social'
import { PulseDot } from './Ui'

type ChatMsg = { id: string; role: 'bot' | 'user'; text: string }

function Fab({
  href,
  onClick,
  label,
  className,
  children,
}: {
  href?: string
  onClick?: () => void
  label: string
  className: string
  children: ReactNode
}) {
  const base =
    'grid size-14 place-items-center rounded-full text-white shadow-[0_10px_24px_-6px_rgba(15,23,42,0.32),0_2px_6px_rgba(15,23,42,0.12)] transition-[box-shadow,transform] duration-[var(--duration-fast)] active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand'

  if (href) {
    return (
      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer noopener' : undefined} aria-label={label} className={cx(base, className)}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} aria-label={label} className={cx(base, className)}>
      {children}
    </button>
  )
}

function ChatPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { locale, copy } = useLocale()
  const titleId = useId()
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [messages, setMessages] = useState<ChatMsg[]>([{ id: 'welcome', role: 'bot', text: copy.chat.welcome }])
  const [draft, setDraft] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    setMessages([{ id: 'welcome', role: 'bot', text: copy.chat.welcome }])
    setDraft('')
  }, [locale, copy.chat.welcome])

  useEffect(() => {
    if (!open) return
    const t = window.setTimeout(() => inputRef.current?.focus(), 220)
    return () => window.clearTimeout(t)
  }, [open, busy])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, busy, open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const ask = async (text: string) => {
    const cleaned = text.trim()
    if (!cleaned || busy) return

    const userMsg: ChatMsg = { id: `u-${Date.now()}`, role: 'user', text: cleaned }
    const next = [...messages, userMsg]
    setMessages(next)
    setDraft('')
    setBusy(true)

    const history = next
      .filter((m) => m.id !== 'welcome')
      .map((m) => ({ role: m.role === 'bot' ? ('assistant' as const) : ('user' as const), content: m.text }))

    const result = await postJson<{ reply: string }>('/api/chat', { messages: history, locale })
    setBusy(false)

    if (result.ok && typeof result.data.reply === 'string' && result.data.reply.trim()) {
      setMessages((m) => [...m, { id: `b-${Date.now()}`, role: 'bot', text: result.data.reply.trim() }])
      return
    }

    const fallback = !result.ok ? result.error : ''
    setMessages((m) => [
      ...m,
      {
        id: `b-${Date.now()}`,
        role: 'bot',
        text:
          fallback ||
          copy.chat.fallback.replace('{email}', SITE.email).replace('{phone}', SITE.phone),
      },
    ])
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    void ask(draft)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 14, scale: 0.98 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="fixed end-3 bottom-[5.75rem] z-[55] flex h-[min(34rem,calc(100svh-7.5rem))] w-[min(22.5rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-[24px] border border-line bg-white shadow-[var(--shadow-float)] sm:end-6 sm:bottom-[6.25rem]"
        >
          <header className="flex items-center gap-3 border-b border-line bg-[linear-gradient(115deg,#1a63d8,#4b53e8_58%,#0e9a9e)] px-4 py-3 text-white">
            <Brand size="xs" onDarkPlate className="!rounded-xl !px-2 !py-1.5 shrink-0" />
            <div className="min-w-0 flex-1">
              <p id={titleId} className="truncate text-[14px] font-semibold tracking-[-0.02em]">
                {copy.chat.title}
              </p>
              <p className="flex items-center gap-1.5 text-[11px] text-white/80">
                <PulseDot className="size-1.5" />
                {copy.chat.subtitle}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={copy.chat.close}
              className="grid size-9 place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
            >
              <X className="size-4" aria-hidden />
            </button>
          </header>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-[#f4f7fd] px-3.5 py-4">
            {messages.map((m) => (
              <div key={m.id} className={cx('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
                <div
                  className={cx(
                    'max-w-[85%] rounded-[16px] px-3.5 py-2.5 text-[13.5px] leading-relaxed whitespace-pre-wrap',
                    m.role === 'user'
                      ? 'rounded-br-md bg-brand text-white'
                      : 'rounded-bl-md border border-line bg-white text-ink-2 shadow-[0_8px_18px_-16px_rgb(9_30_74/0.45)]',
                  )}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {busy && (
              <div className="flex justify-start">
                <div className="inline-flex items-center gap-2 rounded-[16px] rounded-bl-md border border-line bg-white px-3.5 py-2.5 text-[12.5px] text-muted">
                  <LoaderCircle className="size-3.5 animate-spin" aria-hidden />
                  {copy.chat.thinking}
                </div>
              </div>
            )}

            {messages.length === 1 && !busy && (
              <div className="flex flex-wrap gap-2 pt-1">
                {copy.chat.suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => void ask(s)}
                    className="rounded-full border border-brand/20 bg-white px-3 py-1.5 text-[12px] font-medium text-brand transition-colors hover:border-brand hover:bg-brand-soft"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-line bg-white p-3">
            <form onSubmit={onSubmit} className="flex gap-2">
              <input
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={copy.chat.placeholder}
                disabled={busy}
                className="h-11 min-w-0 flex-1 rounded-full border border-line-strong bg-soft/60 px-4 text-[14px] text-ink placeholder:text-faint focus:border-brand focus:outline-none disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={busy || !draft.trim()}
                className="grid size-11 shrink-0 place-items-center rounded-full bg-brand text-white transition-[filter,transform] hover:brightness-110 active:scale-95 disabled:opacity-40"
                aria-label={copy.chat.send}
              >
                {busy ? <LoaderCircle className="size-4 animate-spin" aria-hidden /> : <Send className="size-4" aria-hidden />}
              </button>
            </form>
            <p className="mt-2 text-center text-[10.5px] text-faint">
              {copy.navUi.chatWhatsApp}{' '}
              <a href={SITE.whatsapp} target="_blank" rel="noreferrer noopener" className="font-medium text-brand">
                {SITE.phone}
              </a>
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/** End-side WhatsApp + AI chat + call stack. */
export function FloatingActions() {
  const { copy } = useLocale()
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <>
      <ChatPanel open={chatOpen} onClose={() => setChatOpen(false)} />

      <div className="pointer-events-none fixed end-3 bottom-5 z-[54] flex flex-col items-end gap-3 sm:end-6 sm:bottom-6">
        <div className="pointer-events-auto flex flex-col items-center gap-3">
          <Fab href={SITE.whatsapp} label={`${copy.navUi.chatWhatsApp} ${SITE.phone}`} className="bg-[#25D366]">
            <IconWhatsApp className="size-[1.65rem]" />
          </Fab>

          <Fab
            onClick={() => setChatOpen((v) => !v)}
            label={chatOpen ? copy.chat.closeChat : copy.chat.openChat}
            className={chatOpen ? 'bg-ink' : 'bg-[#4F6BED]'}
          >
            {chatOpen ? <X className="size-6" strokeWidth={2.5} aria-hidden /> : <IconMessenger className="size-[1.55rem]" />}
          </Fab>

          <Fab onClick={() => setChatOpen(true)} label={copy.chat.openChat} className="bg-[#4F6BED]">
            <IconPhone className="size-[1.45rem]" />
          </Fab>
        </div>
      </div>
    </>
  )
}
