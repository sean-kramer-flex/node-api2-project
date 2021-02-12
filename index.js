// require your server and launch it here
const server = require('./api/server')

server.get('/', (req, res) => {
  res.json("Welcome to Posts API!")
})

server.listen(4000, () => {
  console.log('server listening at http://localhost:4000');
})