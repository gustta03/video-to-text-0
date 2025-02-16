/* eslint-disable @typescript-eslint/no-namespace */
import { AddAccount } from '../../../usecases/protocols/add-account-protocol'
import { Controller } from '../../protocols/controller'
import { HttpBodyResponse } from '../../protocols/http'
import { HttpResponse } from '../../helper/httpResponse'
import { MissingParamError } from '../../../utils/errors/missing-param-error'

export class AddAccountController implements Controller {
  constructor (private readonly addAccountUseCase: AddAccount) {}

  async handle (request: AddAccountControllerParam.Request): Promise<HttpBodyResponse> {
    try {
      const { name, email, whatsapp } = request.body
      if (!name || !email || !whatsapp) {
        return HttpResponse.badRequest(new MissingParamError('Dados incompletos'))
      }
      const accountResult = await this.addAccountUseCase.add({ ...request.body })
      return HttpResponse.ok(accountResult)
    } catch (error) {
      console.log(error)
      return HttpResponse.InteanlError()
    }
  }
}

export namespace AddAccountControllerParam {
  export type Request = {
    body: {
      name: string
      email: string
      whatsapp: string
    }
  }
}
