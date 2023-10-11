import { AddAccountUseCase } from '../add-account'

type sutType = {
  addAccountUseCase: any
}

class AddAccountRepositoryStub {
  accessToken = 'any-token'
  async add (): Promise<string> {
    return this.accessToken
  }
}

const makeSut = (): sutType => {
  const addAccountRepository = new AddAccountRepositoryStub()
  const addAccountUseCase = new AddAccountUseCase(addAccountRepository)
  return {
    addAccountUseCase
  }
}

describe('AddAccountUseCase', () => {
  test('should return a string token fake', async () => {
    const { addAccountUseCase } = makeSut()
    const request = await addAccountUseCase.load({
      name: 'any_name',
      email: 'any_mail',
      password: 'any_password'
    })
    expect(request).toBe('any-token')
  })
  test('should throw an error when AddAccountRepository fail', async () => {
    const mockAddAccountError = {
      add: jest.fn().mockImplementation(() => {
        throw new Error('error saving user')
      })
    }
    const addAccountUseCase = new AddAccountUseCase(mockAddAccountError)
    try {
      await addAccountUseCase.load({
        name: 'any-name',
        email: 'invalid-mail',
        password: 'any-password'
      })
    } catch (error) {
      expect(error.message).toBe('error saving user')
    }
    expect(mockAddAccountError.add).toHaveBeenCalledTimes(1)
  })
})
