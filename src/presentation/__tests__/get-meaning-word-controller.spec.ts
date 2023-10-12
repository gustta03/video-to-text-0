import { WordMeaningGpt } from '@/usecases/protocols/get-meaning-protocol'
import { HttpResponse } from '../helper/httpResponse'

type sutType = {
  getMeaningFromGptController: GetMeaningFromGptController
}

class GetMeaningFromGptUseCaseStub implements WordMeaningGpt {
  GPTResponse = 'any-gpt-response'
  async load (params: string): Promise<string> {
    return this.GPTResponse
  }
}

export class GetMeaningFromGptController {
  constructor (private readonly getMeaningWordUseCase: any) {}
  async handle (httpRequest: any): Promise<any> {
    try {
      const meaningWord = await this.getMeaningWordUseCase.load(httpRequest.body)
      return HttpResponse.ok(meaningWord)
    } catch (error) {
      HttpResponse.InteanlError()
    }
  }
}

const makeSut = (): sutType => {
  const getMeaningWordUseCase = new GetMeaningFromGptUseCaseStub()
  const getMeaningFromGptController = new GetMeaningFromGptController(getMeaningWordUseCase)
  return {
    getMeaningFromGptController
  }
}

describe('GetMeaningController', () => {
  test('should return an string response from usecase', async () => {
    const { getMeaningFromGptController } = makeSut()
    const request = await getMeaningFromGptController.handle({ word: 'any_word' })
    expect(request.statusCode).toBe(200)
    expect(request.body).toBe('any-gpt-response')
  })

  test('should return an string response from usecase', async () => {
    const mockImplementationUseCase = {
      load: jest.fn().mockImplementation(() => {
        throw new Error('Internal Server Error')
      })
    }
    const getMeaningFromGptController = new GetMeaningFromGptController(mockImplementationUseCase)

    try {
      await getMeaningFromGptController.handle({ word: 'any_word' })
    } catch (error) {
      expect(error.message).toBe('Internal Server Error')
    }
  })
})
