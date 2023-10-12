/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { GetMeaningFromGptController } from '@/presentation/controllers/get-meaning-word-controller'
import { makeGetMeaningFromGptUseCase } from '../usecases/get-meaning-factory'

export const makeGetMeaningController = () => {
  return new GetMeaningFromGptController(makeGetMeaningFromGptUseCase())
}
