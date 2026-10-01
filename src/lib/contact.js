const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const LIMITS = Object.freeze({ name: 80, email: 120, message: 2000 })

// Returns an object of field -> message. Empty object means valid.
export function validate({ name = '', email = '', message = '' }) {
  const errors = {}
  const n = name.trim()
  const e = email.trim()
  const m = message.trim()
  if (!n) errors.name = 'Please add your name.'
  else if (n.length > LIMITS.name) errors.name = `Keep it under ${LIMITS.name} characters.`
  if (!e) errors.email = 'I need an email to reply to.'
  else if (!EMAIL.test(e) || e.length > LIMITS.email) errors.email = 'That email doesn’t look right.'
  if (m.length < 10) errors.message = 'A little more detail, please (10+ characters).'
  else if (m.length > LIMITS.message) errors.message = `Keep it under ${LIMITS.message} characters.`
  return errors
}
