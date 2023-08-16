const express = require('express')
const run = require('./fetcher.js')

const app = express()
app.use(express.json())
app.disable('x-powered-by')

// Define the whitelist of allowed origins
const allowedOrigins = ['http://localhost:8080']

app.use((req, res, next) => {
  const { origin } = req.headers;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin)
  }
  next()
})

app.get('/', async (req, res) => {
  const { url, option } = req.query

  try {
    if (!url || !option) {
      return res.status(400).json({ error: 'Missing url or option' })
    }

    let result;
    if (option === 'screenshot' || option === 'links') {
      result = await run(url, option)
    } else {
      return res.status(400).json({ error: 'Invalid option' })
    }

    if (option === 'screenshot') {
      const screenshotBase64 = result.toString('base64')
      res.writeHead(200, {
        'Content-Type': 'image/png',
      })
      res.end(screenshotBase64, 'base64')
    } else if (option === 'links') {
      return res.status(200).json({ links: result })
    }
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({ error: 'An error occurred' })
  }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})