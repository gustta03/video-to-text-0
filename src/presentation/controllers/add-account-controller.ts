/* eslint-disable @typescript-eslint/no-namespace */
import { AddAccount } from '@/usecases/protocols/add-account-protocol'
import { Controller } from '../protocols/controller'
import { HttpBodyResponse } from '../protocols/http'
import { HttpResponse } from '../helper/httpResponse'
import { MissingParamError } from '../../utils/errors/missing-param-error'

export class AddAccountController implements Controller {
  constructor (private readonly addAccountUseCase: AddAccount) {}

  async handle (
    request: AddAccountController.Request
  ): Promise<HttpBodyResponse> {
    try {
      const { name, email, password } = request
      if (!name || !email || !password) {
        return HttpResponse.badRequest(new MissingParamError('missing params'))
      }
      const accountResult = await this.addAccountUseCase.add({
        name,
        email,
        password
      })
      return HttpResponse.created(accountResult)
    } catch (error) {
      return HttpResponse.InteanlError()
    }
  }
}

export namespace AddAccountController {
  export type Request = {
    name: string
    email: string
    password: string
  }
}
