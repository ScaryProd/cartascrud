import env from 'dotenv' // to know exactly why it takes the .env or to take another one, read https://github.com/motdotla/dotenv

env.config({path: './.env'})
if (env.error) {
  console.log('No .env file found, reading from ENVIRONMENT')
}

const PORT = process.env.PORT || 8000
const MONGO_DB_URL = process.env.MONGO_DB_URL || ""
const MONGO_DB_USER = process.env.MONGO_DB_USER || ""
const MONGO_DB_PASS = process.env.MONGO_DB_PASS || ""

export {
  PORT,
  MONGO_DB_URL,
  MONGO_DB_USER,
  MONGO_DB_PASS
}