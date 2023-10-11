import { MissingParamError } from './errors/missing-param-error'

export class EmailValidator {
  isValid (email: string): boolean {
    if (!email) {
      throw new MissingParamError('email')
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
}
