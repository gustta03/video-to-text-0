import { makeTranscription } from '@/main/factories/controller/make-trascription-controller'
import { adaptRoute } from '@/main/adapters'

import { Router } from 'express'

export default (router: Router): void => {
  router.get('/transcription/video/:id', adaptRoute(makeTranscription()))
}
