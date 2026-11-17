import { LoaderCircle, Send, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react'

import { SITE } from '../data'
import { postJson } from '../lib/api'
import { cx } from '../lib/cx'
import { useLocale } from '../lib/locale'
import { Brand } from './Logo'
import { PulseDot } from './Ui'

type ChatMsg = { id: string; role: 'bot' | 'user'; text: string }

/** Bold white glyphs — match the classic WhatsApp / chat / call FABs. */
function IconWhatsApp({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M12.04 2c-5.46 0-9.91 4.43-9.91 9.9 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.9-4.44 9.9-9.9 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.8a8.07 8.07 0 0 1 8.1 8.1 8.07 8.07 0 0 1-8.1 8.09c-1.42 0-2.8-.37-4.02-1.07l-.29-.17-3.12.82.83-3.04-.19-.31a8.05 8.05 0 0 1-1.12-4.32 8.07 8.07 0 0 1 8.1-8.1Zm4.63 11.53c-.2.56-1.15 1.07-1.6 1.14-.41.06-.93.09-1.5-.09-.35-.12-.79-.25-1.36-.49-2.39-1.03-3.95-3.44-4.07-3.6-.12-.16-1-1.33-1-2.54 0-1.2.63-1.8.86-2.04.22-.24.49-.3.65-.3h.47c.15 0 .35-.06.55.42.2.49.69 1.69.75 1.81.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.31-.36.42-.12.12-.24.24-.1.47.14.24.62 1.02 1.33 1.65.91.82 1.68 1.07 1.92 1.19.24.12.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.14 1.14Z" />
    </svg>
  )
}

function IconChat({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 6.2A3.2 3.2 0 0 1 7.7 3h8.6a3.2 3.2 0 0 1 3.2 3.2v6.1a3.2 3.2 0 0 1-3.2 3.2H11l-3.8 3.1c-.55.45-1.35.06-1.35-.66V15.5A3.2 3.2 0 0 1 4.5 12.3V6.2Z" />
      <path d="M8.2 8.4h7.6M8.2 11.4h5.2" />
    </svg>
  )
}

function IconCall({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M6.6 10.8c1.4 2.9 3.8 5.3 6.7 6.7l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.7.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.9 21.3 2.7 13.1 2.7 3.7c0-.6.4-1 1-1H7.3c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.7.1.3 0 .7-.2 1L6.6 10.8Z" />
    </svg>
  )
}

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
            {chatOpen ? <X className="size-6" strokeWidth={2.5} aria-hidden /> : <IconChat className="size-[1.55rem]" />}
          </Fab>

          <Fab onClick={() => setChatOpen(true)} label={copy.chat.openChat} className="bg-[#4F6BED]">
            <IconCall className="size-[1.45rem]" />
          </Fab>
        </div>
      </div>
    </>
  )
}
