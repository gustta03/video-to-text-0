import { AddAccount } from '../protocols/add-account-protocol'
import {
  hashAccountPassoword,
  addAccountRepository,
  GenerateToken
} from '../protocols/db/db-add-account-protocols'
import { AddAccountUseCase } from '../add-account'
import { EmailValidadtor } from '../protocols/email-validator-protocol'
import { Hasher } from '../protocols/cryptography/hasher-protocol'

type SutType = {
  addAccountUseCase: AddAccount
  verifyEmailValidatorStub: any
  hashAccountPassword: hashAccountPassoword
  addAccountRepository: addAccountRepository
  generatedToken: TokenGenerator
}

class AddAccountRepositoryStub {
  accessToken = 'any-token'
  async add (): Promise<string> {
    return this.accessToken
  }
}

class HashAccountPasswordStub implements Hasher {
  hashed = 'any-hash'
  async hash (password: string): Promise<string> {
    return this.hashed
  }
}

class VerifyEmailValidatorStub implements EmailValidadtor {
  ifIsValid: boolean

  isValid (email: string): boolean {
    return this.ifIsValid
  }
}

class TokenGenerator implements GenerateToken {
  ifIsValid: 'eny_token'

  async encrypt (email: string): Promise<string> {
    return this.ifIsValid
  }
}

const makeSut = (): SutType => {
  const addAccountRepository = new AddAccountRepositoryStub()
  const verifyEmailValidatorStub = new VerifyEmailValidatorStub()
  const hashAccountPassword = new HashAccountPasswordStub()
  const generatedToken = new TokenGenerator()
  const addAccountUseCase = new AddAccountUseCase(
    addAccountRepository,
    verifyEmailValidatorStub,
    hashAccountPassword,
    generatedToken
  )
  return {
    addAccountUseCase,
    addAccountRepository,
    verifyEmailValidatorStub,
    hashAccountPassword,
    generatedToken
  }
}

describe('AddAccountUseCase', () => {
  test('should return a valid access token when provided with valid input', async () => {
    const { addAccountUseCase } = makeSut()
    const request = await addAccountUseCase.add({
      name: 'any_name',
      email: 'any_mail@mail.com', // Email válido
      password: 'any_password'
    })
    expect(request).toBe('any-token')
  })

  test('should throw an error when AddAccountRepository fails', async () => {
    const { verifyEmailValidatorStub, hashAccountPassword, generatedToken } = makeSut()
    const mockAddAccountError = {
      add: jest.fn().mockImplementation(() => {
        throw new Error('email invalid is provided')
      })
    }
    const addAccountUseCase = new AddAccountUseCase(
      mockAddAccountError,
      verifyEmailValidatorStub,
      hashAccountPassword,
      generatedToken
    )

    await expect(async () => {
      await addAccountUseCase.add({
        name: 'any-name',
        email: 'invalid-mail', // Email inválido
        password: 'any-password'
      })
    }).rejects.toThrow('email invalid is provided')
  })

  test('should throw an error if isValid return false', async () => {
    const { hashAccountPassword, verifyEmailValidatorStub, addAccountRepository, generatedToken } = makeSut()
    const verifyEmailValidator = new VerifyEmailValidatorStub()
    verifyEmailValidator.ifIsValid = false

    const addAccountUseCase = new AddAccountUseCase(
      addAccountRepository,
      verifyEmailValidatorStub,
      hashAccountPassword, generatedToken
    )

    try {
      await addAccountUseCase.add({
        name: 'any_name',
        email: 'any_email', // Email válido
        password: 'any_password'
      })
    } catch (error) {
      expect(error.message).toBe('email invalid is provided')
    }
  })
})
