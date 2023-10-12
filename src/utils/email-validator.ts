import { EmailValidadtor } from '@/usecases/protocols/email-validator-protocol'
import { MissingParamError } from './errors/missing-param-error'

export class EmailValidator implements EmailValidadtor {
  isValid (email: string): boolean {
    if (!email) {
      throw new MissingParamError('email')
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
}
