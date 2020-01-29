const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/main', (req, res) => res.send("안녕하세요"));

app.get('/sub', (req, res) => res.send("잘 가세요 get"));

app.post('/sub', (req, res) => res.send("잘 가세요 post"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));