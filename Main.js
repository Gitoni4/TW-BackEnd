const App = require('./App')
const RequestBody = require('./RequestBody')
const PORT = 5000

const JSONheader = {'Content-Type': 'application/json; charset=UTF-8'}

const app = new App(5000)

app.get('/users', (req, res) => {
    // TODO verific daca am QS
    // ?username=:name&password=:pass
    res.writeHead(200, JSONheader)
    res.write('merge :D')

    let extractedParams = new RequestBody(req)
    res.write(`${extractedParams.method} ${extractedParams.path} ${extractedParams.params}`)

    res.end()
})

app.post('/otherroute', (req, res) => {
    res.writeHead(200, JSONheader)
    res.write('hello from other route')
    res.end()
})

app.startServer(() => {
    console.log(`Server started on port ${PORT}! Enjoy!`)
})