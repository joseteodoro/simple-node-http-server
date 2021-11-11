const server = require('./server')

const [ port, path, _ ] = process.argv.slice(2)

server.listen({port, path})
