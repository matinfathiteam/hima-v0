import { z } from 'zod'

/** Iranian mobile or landline, loose but sane. */
const phoneRegex = /^0?\d{9,11}$/

export const contactRegex = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: phoneRegex,
}

export const nameSchema = z
  .string()
  .trim()
  .min(2, 'نام باید حداقل ۲ حرف باشد')
  .max(60, 'نام بیش از حد طولانی است')

export const emailSchema = z.string().trim().regex(contactRegex.email, 'ایمیل معتبر نیست')

export const phoneSchema = z
  .string()
  .trim()
  .regex(phoneRegex, 'شماره تماس معتبر نیست')

/** Accepts either a valid email or a valid phone number. */
export const emailOrPhoneSchema = z
  .string()
  .trim()
  .min(1, 'این فیلد الزامی است')
  .refine(
    (v) => contactRegex.email.test(v) || phoneRegex.test(v),
    'ایمیل یا شماره تماس معتبر وارد کنید',
  )

export const urlSchema = z
  .string()
  .trim()
  .min(1, 'آدرس سایت الزامی است')
  .refine((v) => {
    try {
      const withProto = v.startsWith('http') ? v : `https://${v}`
      new URL(withProto)
      return true
    } catch {
      return false
    }
  }, 'آدرس سایت معتبر نیست')

export const contactSchema = z.object({
  name: nameSchema,
  contact: emailOrPhoneSchema,
  subject: z.string().min(1, 'یک موضوع انتخاب کنید'),
  message: z.string().trim().min(10, 'پیام باید حداقل ۱۰ حرف باشد').max(2000),
})

export const auditSchema = z.object({
  website: urlSchema,
  name: nameSchema,
  contact: emailOrPhoneSchema,
})

export const referSchema = z.object({
  name: nameSchema,
  contact: emailOrPhoneSchema,
  referredName: z.string().trim().min(2, 'نام معرفی‌شده الزامی است').max(60),
  note: z.string().trim().max(500).optional(),
})

export const leadGateSchema = z.object({
  contact: emailOrPhoneSchema,
})

export type ContactValues = z.infer<typeof contactSchema>
export type AuditValues = z.infer<typeof auditSchema>
export type ReferValues = z.infer<typeof referSchema>
