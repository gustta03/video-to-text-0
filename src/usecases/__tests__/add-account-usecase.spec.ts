import { AddAccont, AddAccount } from '../protocols/add-account-protocol'
import { addAccountRepository } from '../protocols/db/db-add-account-repository'
type sutType = {
  addAccountUseCase: any
}

export class AddAccountUseCase implements AddAccount {
  constructor (private readonly addAccountRepository: addAccountRepository) {}
  async load (params: AddAccont.Params): Promise<string> {
    return await this.addAccountRepository.add(params)
  }
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
    const request = await addAccountUseCase.load({ name: 'any_name', email: 'any_mail', password: 'any_password' })
    expect(request).toBe('any-token')
  })
})
