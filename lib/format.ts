const FA_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']

export function toPersianDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => FA_DIGITS[Number(d)])
}

export function formatToman(amount: number): string {
  const formatted = amount.toLocaleString('en-US')
  return `${toPersianDigits(formatted)} تومان`
}

export function formatMillionToman(amount: number): string {
  const millions = amount / 1_000_000
  const val = Number.isInteger(millions) ? millions : millions.toFixed(1)
  return `${toPersianDigits(val)} میلیون تومان`
}

/** Basic sanitizer: strips angle brackets to neutralize any injected markup. */
export function sanitizeText(input: string): string {
  return input.replace(/[<>]/g, '').trim()
}
