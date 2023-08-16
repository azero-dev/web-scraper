const express = require('express');
const run = require('./fetcher.js');

const app = express();
app.use(express.json());
app.disable('x-powered-by');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET');
  next();
});

app.get('/', async (req, res) => {
  const { options } = req.query;
  if (options === 'screenshot') {
    try {
      const ans = await run();
      // console.log(ans);
      res.contentType('image/png'); 
      res.send(ans);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  } else {
    res.send('<h1>Ask me something!</h1>');
  }
});

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
