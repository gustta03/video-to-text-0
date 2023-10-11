import { AddAccount } from '../protocols/add-account-protocol'
import {
  hashAccountPassoword,
  addAccountRepository
} from '../protocols/db/db-add-account-protocols'
import { AddAccountUseCase } from '../add-account'

type SutType = {
  addAccountUseCase: AddAccount
  verifyEmailValidatorStub: any
  hashAccountPassword: hashAccountPassoword
  addAccountRepository: addAccountRepository
}

class AddAccountRepositoryStub {
  accessToken = 'any-token'
  async add (): Promise<string> {
    return this.accessToken
  }
}

class HashAccountPasswordStub {
  hashed = 'any-hash'
  async hash (password: string): Promise<string> {
    return this.hashed
  }
}

class VerifyEmailValidatorStub {
  ifIsValid = false

  async isValid (email: string): Promise<any> {
    if (this.ifIsValid) throw new Error('invalid email')
  }
}

const makeSut = (): SutType => {
  const addAccountRepository = new AddAccountRepositoryStub()
  const verifyEmailValidatorStub = new VerifyEmailValidatorStub()
  const hashAccountPassword = new HashAccountPasswordStub()
  const addAccountUseCase = new AddAccountUseCase(
    addAccountRepository,
    verifyEmailValidatorStub,
    hashAccountPassword
  )
  return {
    addAccountUseCase,
    addAccountRepository,
    verifyEmailValidatorStub,
    hashAccountPassword
  }
}

describe('AddAccountUseCase', () => {
  test('should return a valid access token when provided with valid input', async () => {
    const { addAccountUseCase } = makeSut()
    const request = await addAccountUseCase.add({
      name: 'any_name',
      email: 'any_mail',
      password: 'any_password'
    })
    expect(request).toBe('any-token')
  })

  test('should throw an error when AddAccountRepository fails', async () => {
    const { verifyEmailValidatorStub, hashAccountPassword } = makeSut()
    const mockAddAccountError = {
      add: jest.fn().mockImplementation(() => {
        throw new Error('error saving user')
      })
    }
    const addAccountUseCase = new AddAccountUseCase(
      mockAddAccountError,
      verifyEmailValidatorStub,
      hashAccountPassword
    )

    await expect(async () => {
      await addAccountUseCase.add({
        name: 'any-name',
        email: 'invalid-mail',
        password: 'any-password'
      })
    }).rejects.toThrow('error saving user')

    expect(mockAddAccountError.add).toHaveBeenCalledTimes(1)
  })

  test('should throw an error if isValid return false', async () => {
    const {
      hashAccountPassword,
      verifyEmailValidatorStub,
      addAccountRepository
    } = makeSut()
    const verifyEmailValidator = new VerifyEmailValidatorStub()
    verifyEmailValidator.ifIsValid = false

    const addAccountUseCase = new AddAccountUseCase(
      addAccountRepository,
      verifyEmailValidatorStub,
      hashAccountPassword
    )

    try {
      await addAccountUseCase.add({
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      })
    } catch (error) {
      expect(error.message).toBe('email invalid is provided')
    }
  })
})
