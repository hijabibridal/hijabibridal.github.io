// ─────────────────────────────────────────────────────────────────────────
// PROMO CODES — this is the ONE place to add, change or delete codes.
//
//  ADD a code:    open coupon-helper.html on your computer (double-click it),
//                 fill it in, and paste the line it gives you into the list
//                 below, under the last code.
//  DELETE a code: delete its whole line. (To pause a code without deleting
//                 it, put // at the very start of its line.)
//  Then save the file and let the site deploy. New codes work as soon as
//  the deploy finishes.
//
// What is on each line:
//   code         The word customers type in. Not case-sensitive, no spaces.
//   type         'percent' = value is a percentage off (10 means 10% off)
//                'dollar'  = value is a dollar amount off (5 means $5 off)
//   value        The amount — just the number, no % or $ sign.
//   expires      (optional) The last day the code works, like '2026-12-31'.
//   minSubtotal  (optional) The smallest items total (before shipping) the
//                code works on. Leave it out for no minimum.
//   emailHashes  (optional) The customers allowed to use the code. These
//                are scrambled versions of their email addresses — the
//                helper page makes them for you. The customer must type
//                their email into the Email Address box at checkout.
//                Leave this out and ANYONE can use the code.
//
// Good to know:
//   • The discount comes off the items only — never shipping.
//   • The $50 free-shipping rule and the country purchase caps still use
//     the price BEFORE the discount.
//   • A discount can never take the items below $0.01, so don't make
//     100%-off codes.
//   • One code per order.
//   • This file is public (it ships inside the website's code). Real email
//     addresses never appear in it, only the scrambled versions. Don't type
//     customers' names or emails in here, even in a // note — if you want a
//     reminder of who a code is for, use an order number.
//   • Never change HASH_PREFIX below. If you do, every emailHashes entry
//     stops working (the helper page uses the same prefix).
// ─────────────────────────────────────────────────────────────────────────

export type Coupon = {
  code: string
  type: 'percent' | 'dollar'
  value: number
  expires?: string
  minSubtotal?: number
  emailHashes?: string[]
}

export const COUPONS: Coupon[] = [
  // ↓↓↓ YOUR CODES — one per line ↓↓↓

  // Your own test code — only works with your email typed at checkout.
  { code: 'CHECKING', type: 'dollar', value: 24, minSubtotal: 1, emailHashes: ['89bf1e7e19db848baef4d7ad26c6a7dcc927482a58fc7c47adac3a1e93307cb6'] },

  // ── SAMPLES — these three are switched off (the // at the start of each
  // line). The emails in them are made up (anna/sara/layla@example.com).
  // To use a sample, remove the // from the start of its line(s) and change
  // it — or just make a fresh line with coupon-helper.html.

  // 1) 10% off for one past customer:
  // { code: 'THANKS10', type: 'percent', value: 10, emailHashes: ['279049f3208f21e9424380381f79f77b03454774463e178715c17826af42a71b'] },

  // 2) $5 off for two past customers, orders of $25 or more, ends Dec 31:
  // { code: 'COMEBACK5', type: 'dollar', value: 5, expires: '2026-12-31', minSubtotal: 25, emailHashes: [
  //     '222cab4938f32a1bf8abd6059e33e2130263d80e84e471169dff90eb06a08bbe',
  //     '522b3955616eaf626a93be31a086ac535dd5ff34bb632a89094ca3923d3066b3',
  //   ] },

  // 3) 15% off for ANYONE (no emailHashes), orders of $40 or more:
  // { code: 'FRIENDS15', type: 'percent', value: 15, minSubtotal: 40 },

  // ↑↑↑ YOUR CODES ↑↑↑
]

// ─── Everything below here is the checking logic — no need to edit. ───────

// Do not change this (see the note at the top).
export const HASH_PREFIX = 'hijabi-bridal-coupons-v1:'

// Turns an email into its scrambled form: trims it, makes it lowercase, adds
// the prefix, and runs it through SHA-256. Returns '' for a blank email.
export async function hashEmail(email: string | null | undefined): Promise<string> {
  const clean = (email || '').trim().toLowerCase()
  if (!clean) return ''
  const bytes = new TextEncoder().encode(HASH_PREFIX + clean)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export type CouponResult =
  | { ok: true; coupon: Coupon; discount: number }
  | { ok: false; reason: string }

const cents = (n: number) => Math.round(n * 100) / 100

// emailHash = the result of hashEmail() on the email typed at checkout.
export function applyCoupon(
  input: string | null | undefined,
  subtotal: number,
  emailHash?: string | null
): CouponResult {
  const code = (input || '').trim().toUpperCase()
  if (!code) return { ok: false, reason: 'Please enter a promo code.' }

  const coupon = COUPONS.find((c) => c.code.trim().toUpperCase() === code)
  if (!coupon || !(coupon.value > 0)) {
    return { ok: false, reason: "Sorry, that promo code isn't valid." }
  }

  // Email-restricted codes: the email typed at checkout must be on the list.
  if (coupon.emailHashes) {
    if (!emailHash) {
      return { ok: false, reason: 'Please enter your email address above first, then apply your code.' }
    }
    if (!coupon.emailHashes.includes(emailHash.toLowerCase())) {
      return { ok: false, reason: "Sorry, that promo code isn't valid for this email address." }
    }
  }

  if (coupon.expires) {
    const lastMoment = new Date(`${coupon.expires}T23:59:59`)
    if (!isNaN(lastMoment.getTime()) && Date.now() > lastMoment.getTime()) {
      return { ok: false, reason: 'Sorry, that promo code has expired.' }
    }
  }

  if (coupon.minSubtotal && subtotal < coupon.minSubtotal) {
    return {
      ok: false,
      reason: `That promo code needs at least $${coupon.minSubtotal.toFixed(2)} in items.`,
    }
  }

  let discount = coupon.type === 'percent' ? (subtotal * coupon.value) / 100 : coupon.value
  discount = cents(discount)

  // Never let the discount take the items to zero — PayPal rejects $0 orders.
  const maxDiscount = Math.max(0, cents(subtotal - 0.01))
  if (discount > maxDiscount) discount = maxDiscount

  if (discount <= 0) return { ok: false, reason: "Sorry, that promo code isn't valid." }

  return { ok: true, coupon, discount }
}
