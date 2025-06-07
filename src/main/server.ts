/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
import 'module-alias/register'
import app from '@/main/config/app'
import env from '@/main/config/env'
import { connect } from '@/infra/db/database'

connect(env.databaseUrl).then(() => {
  app.listen(env.port, () => console.log(`Server running at localhost://${env.port}`))
}).catch(console.error)