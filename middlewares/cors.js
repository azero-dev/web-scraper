import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'https://inferente.com/',
  'http://localhost:8080',
  'https://example.com',
]

export const corsMiddleware = ({acceptedOrigins = ACCEPTED_ORIGINS} = {}) => cors({
  origin: (origin, callback) => {
    if (!origin || acceptedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS. Check the origin'))
    }
  }
})