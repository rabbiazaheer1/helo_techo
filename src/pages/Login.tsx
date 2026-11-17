import { ArrowRight, LoaderCircle } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'

import { Brand } from '../components/Logo'
import { SITE } from '../data'
import { login } from '../lib/auth'
import { cx } from '../lib/cx'

export function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    setError('')
    setBusy(true)
    const result = login({ email, password })
    setBusy(false)
    if (!result.ok) {
      setError(result.error)
      return
    }
    navigate('/')
  }

  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden px-4 py-16">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 grid-lines opacity-50" />
        <div className="absolute -top-24 left-1/4 size-[420px] rounded-full bg-[radial-gradient(circle,#cfe2ff,transparent_65%)] blur-2xl" />
        <div className="absolute right-0 bottom-0 size-[380px] rounded-full bg-[radial-gradient(circle,#e3dbff,transparent_65%)] blur-2xl" />
      </div>

      <div className="w-full max-w-md rounded-[28px] border border-line bg-white/90 p-6 shadow-[var(--shadow-float)] backdrop-blur-xl sm:p-8">
        <Link to="/" className="inline-flex" aria-label={`${SITE.name} home`}>
          <Brand size="sm" />
        </Link>
        <h1 className="display mt-6 text-[clamp(1.8rem,1.4rem+1.5vw,2.4rem)] text-ink">Welcome back</h1>
        <p className="mt-2 text-[14.5px] text-muted">Log in to your Hello Techno account.</p>

        <form onSubmit={onSubmit} className="mt-7 space-y-3" noValidate>
          <label className="block">
            <span className="text-[12.5px] font-medium text-ink-2">Work email</span>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 h-12 w-full rounded-[14px] border border-line-strong bg-soft/50 px-3.5 text-[14.5px] text-ink focus:border-brand focus:outline-none"
              placeholder="you@company.com"
            />
          </label>
          <label className="block">
            <span className="text-[12.5px] font-medium text-ink-2">Password</span>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 h-12 w-full rounded-[14px] border border-line-strong bg-soft/50 px-3.5 text-[14.5px] text-ink focus:border-brand focus:outline-none"
              placeholder="••••••••"
            />
          </label>

          {error && <p className="rounded-[12px] bg-red-50 px-3 py-2 text-[13px] text-danger">{error}</p>}

          <button
            type="submit"
            disabled={busy}
            className={cx(
              'mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(115deg,#1a63d8,#4b53e8_58%,#0e9a9e)] text-[15px] font-medium text-white transition-[filter,transform] hover:brightness-105 active:scale-[0.98] disabled:opacity-60',
            )}
          >
            {busy ? <LoaderCircle className="size-4 animate-spin" aria-hidden /> : null}
            Log in
            {!busy && <ArrowRight className="size-4" aria-hidden />}
          </button>
        </form>

        <p className="mt-5 text-center text-[13.5px] text-muted">
          New here?{' '}
          <Link to="/signup" className="font-medium text-brand hover:text-brand-deep">
            Create an account
          </Link>
        </p>
      </div>
    </main>
  )
}
