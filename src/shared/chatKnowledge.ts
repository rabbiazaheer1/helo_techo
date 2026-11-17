/** Grounding knowledge for the Hello Techno AI assistant. */
export const CHAT_SYSTEM_PROMPT = `You are the Hello Techno website assistant — a helpful, concise AI for Hello Techno Solutions (Doha, Qatar).

Brand: Hello Techno / Hello Techno Solutions
Tagline: Your Business Communication Partner
What you sell: An AI-powered customer communication platform that unifies WhatsApp, voice calls, web chat, Instagram, SMS and email into one governed queue. English + Arabic natively. Books into systems the client already runs (PMS, POS, CRM, diaries). Human takeover in one click.

Contact:
- Email: sales@hellotechnosolutions.com
- Phone / WhatsApp: +974 31637274
- Location: Doha, Qatar (GCC)

Plans (QAR / month):
- Starter: 90/month — messaging channels, 100 credits (~2,000 messages), one location
- Growth: 250/month (recommended) — + voice calls, 300 credits, 75 call minutes, up to 2 locations
- Connected: 599/month — + live system sync, 750 credits, up to 3 locations
- Enterprise: Custom — multi-brand / multi-branch
Credits: 1 credit ≈ QAR 0.88; 20 messages = 1 credit; 1 call minute = 2 credits (from Growth up). 50 free credits to start, zero setup fee.

Industries: Hospitality, aesthetics & dental clinics, restaurants & cafés, automobile dealerships, growing SMBs (salons, gyms, retail).

Typical go-live: 2–3 weeks per location.

Rules:
- Answer in the user's language. Support English and Arabic only (not Roman Urdu). If the site locale is Arabic, prefer Arabic replies unless the user writes in English.
- Keep replies short (2–5 sentences) unless they ask for detail.
- Only use facts from this knowledge. If unsure, say so and offer email/phone/WhatsApp or a free demo.
- Never invent prices, integrations, or legal claims.
- Gently encourage booking a free demo when relevant.
- You are not a replacement for a human sales call on complex enterprise deals.`

export type ChatTurn = { role: 'user' | 'assistant'; content: string }

export function chatSystemPrompt(locale: 'en' | 'ar' = 'en') {
  const localeLine =
    locale === 'ar'
      ? '\n\nSite locale: Arabic. Prefer clear Modern Standard Arabic unless the user writes in English.'
      : '\n\nSite locale: English. Prefer clear English unless the user writes in Arabic.'
  return CHAT_SYSTEM_PROMPT + localeLine
}

/** Offline FAQ-style reply when the live AI API is down. */
export function localChatReply(question: string, locale: 'en' | 'ar' = 'en'): string {
  const q = question.toLowerCase()
  const ar = locale === 'ar'

  if (/price|pricing|plan|cost|اشتراك|سعر|خطة|باقة/.test(q)) {
    return ar
      ? 'الباقات تبدأ من ٩٠ ر.ق/شهر (Starter)، والنمو ٢٥٠ ر.ق (موصى بها)، والمتصلة ٥٩٩ ر.ق. لا رسوم إعداد، و٥٠ رصيداً مجانياً للبداية. احجز عرضاً مجانياً للتفاصيل.'
      : 'Plans start at QAR 90/month (Starter), Growth is QAR 250 (recommended), and Connected is QAR 599. Zero setup fee, 50 free credits to start. Book a free demo for a fit check.'
  }
  if (/whatsapp|channel|instagram|voice|call|قناة|واتساب|هاتف/.test(q)) {
    return ar
      ? 'Hello Techno يوحّد واتساب والمكالمات والدردشة والموقع وإنستغرام والرسائل والبريد في صندوق واحد، بالعربية والإنجليزية، مع تسليم فوري لفريقك.'
      : 'Hello Techno unifies WhatsApp, voice, web chat, Instagram, SMS and email in one governed inbox — Arabic and English — with one-click human takeover.'
  }
  if (/demo|book|trial|عرض|تجربة|احجز/.test(q)) {
    return ar
      ? 'احجز عرضاً مجانياً من صفحة Demo، أو راسلنا sales@hellotechnosolutions.com أو واتساب +974 31637274.'
      : 'Book a free demo on the Demo page, or reach us at sales@hellotechnosolutions.com / WhatsApp +974 31637274.'
  }
  if (/contact|email|phone|رقم|تواصل|بريد/.test(q)) {
    return ar
      ? 'تواصل: sales@hellotechnosolutions.com · هاتف/واتساب +974 31637274 · الدوحة، قطر.'
      : 'Contact: sales@hellotechnosolutions.com · Phone/WhatsApp +974 31637274 · Doha, Qatar.'
  }
  if (/what|hello techno|who|ما هو|من هي|عن/.test(q)) {
    return ar
      ? 'Hello Techno منصة تواصل ذكية للشركات في الخليج — ترد على العملاء عبر القنوات، تحجز في أنظمتكم، وتُبقي كل محادثة مسجّلة.'
      : 'Hello Techno is an AI customer-communication platform for GCC businesses — it answers across your channels, books into your systems, and keeps every conversation on the record.'
  }

  return ar
    ? 'يمكنني المساعدة حول الباقات والقنوات والعرض التجريبي. للأسئلة الدقيقة راسل sales@hellotechnosolutions.com أو واتساب +974 31637274.'
    : 'I can help with plans, channels, and booking a demo. For anything precise, email sales@hellotechnosolutions.com or WhatsApp +974 31637274.'
}
