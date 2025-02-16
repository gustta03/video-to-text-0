/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AddAccountController } from '@/presentation/controllers/account/add-account-controller'
import { makeAddAccountUseCase } from '../usecases/add-account-factory'

export const makeAddAccountController = () => {
  return new AddAccountController(makeAddAccountUseCase())
}
