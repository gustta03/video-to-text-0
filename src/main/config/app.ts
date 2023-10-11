import { setupRoutes } from '@/main/config/routes'
import cors from 'cors'
import express from 'express'

const app = express()
app.use(cors({
  origin: '*'
}))
setupRoutes(app)
export default app
