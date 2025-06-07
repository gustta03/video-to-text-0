export default {
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWTSECRET || 'secret',
  databaseUrl: process.env.DATABASE_URL,
  openIAKey: process.env.OPEN_IA_API_KEY
}
