import { AddAccont, AddAccount } from '../usecases/protocols/add-account-protocol'
import { addAccountRepository } from '../usecases/protocols/db/db-add-account-repository'

export class AddAccountUseCase implements AddAccount {
  constructor (private readonly addAccountRepository: addAccountRepository) {}
  async load (params: AddAccont.Params): Promise<string> {
    return await this.addAccountRepository.add(params)
  }
}
