const express = require('express')
const run = require('./fetcher.js')

const app = express()
app.use(express.json())
app.disable('x-powered-by')

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  next()
})

app.get('/', async (req, res) => {
  const { url, option } = req.query;
  if ( url && option === 'screenshot') {
    try {
      const screenshot = await run(url)
      const screenshotBase64 = screenshot.toString('base64');
      res.writeHead(200, {
        'Content-Type': 'image/png',
      })
      res.end(screenshotBase64, 'base64')
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ error: 'An error occurred' })
    }
  } else if ( url && option === 'links') {
    res.send('<h1>That was a link</h1>')
  } else {
    res.send('<h1>Ask me something!</h1>')
  }
})

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
