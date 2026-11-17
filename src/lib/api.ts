export type ApiResult<T = unknown> =
  | { ok: true; data: T }
  | { ok: false; error: string; fieldErrors?: Record<string, string> }

/** POST JSON to a worker route and normalise the response. */
export async function postJson<T = unknown>(url: string, body: unknown): Promise<ApiResult<T>> {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify(body),
    })
    const contentType = res.headers.get('content-type') ?? ''
    if (!contentType.includes('application/json')) {
      return {
        ok: false,
        error: 'The contact service is unavailable right now. Email us or try again shortly.',
      }
    }
    const json = (await res.json().catch(() => null)) as Record<string, unknown> | null
    if (!json || typeof json !== 'object') {
      return { ok: false, error: 'Something went wrong. Please try again.' }
    }
    if (!res.ok) {
      return {
        ok: false,
        error: typeof json.error === 'string' ? json.error : 'Something went wrong. Please try again.',
        fieldErrors: (json.fieldErrors as Record<string, string>) ?? undefined,
      }
    }
    return { ok: true, data: json as T }
  } catch {
    return { ok: false, error: 'We could not reach the server. Check your connection and try again.' }
  }
}
