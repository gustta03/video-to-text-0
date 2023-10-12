/* eslint-disable @typescript-eslint/no-namespace */
import { AddAccount } from '@/usecases/protocols/add-account-protocol'
import { Controller } from '../protocols/controller'
import { HttpBodyResponse } from '../protocols/http'
import { HttpResponse } from '../helper/httpResponse'
import { MissingParamError } from '../../utils/errors/missing-param-error'

type sutType = {
  addAccountController: AddAccountController
}

class AddAccountUseCaseStub {
  accessToken = 'any_token'
  async add (): Promise<any> {
    return this.accessToken
  }
}

export namespace AddAccountController {
  export type Request = {
    name: string
    email: string
    password: string
  }
}

const makeSut = (): sutType => {
  const addAccountUseCase = new AddAccountUseCaseStub()
  const addAccountController = new AddAccountController(addAccountUseCase)
  return {
    addAccountController
  }
}

describe('AddAccountController', () => {
  test('should create user correctly', async () => {
    const { addAccountController } = makeSut()
    const request = await addAccountController.handle({
      name: 'any_name',
      email: 'any_email.com',
      password: 'any_password'
    })

    expect(request.statusCode).toBe(201)
    expect(request.body).toBe('any_token')
  })
  test('should throw missiParam error if params are no provided in request', async () => {
    const { addAccountController } = makeSut()
    const request = await addAccountController.handle({
      name: 'any_name',
      email: 'any_email.com',
      // no password
      password: ''
    })

    expect(request.statusCode).toBe(400)
    expect(request.body).toBe('Missing param: missing params')
  })
  test('should throw InternalError if error occurs', async () => {
    const mockImplementationUseCase = {
      add: jest.fn().mockImplementation(() => {
        throw new Error('Internal Server Error')
      })
    }

    const addAccountController = new AddAccountController(mockImplementationUseCase)

    try {
      await addAccountController.handle({
        name: '',
        email: '',
        password: ''
      })
    } catch (error) {
      expect(error.message).toBe('Internal Server Error')
    }
  })
})
