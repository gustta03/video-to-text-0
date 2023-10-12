import { makeTranscription } from '@/main/factories/controller/make-trascription-controller'
import { adaptRoute } from '@/main/adapters'

import { Router } from 'express'
// import { makeAddAccountController } from '../factories/controller/add-account-controller'

export default (router: Router): void => {
  router.get('/transcription/video/:id', adaptRoute(makeTranscription()))
}
