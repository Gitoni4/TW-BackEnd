const http = require('http')
const url = require('url')

const JSONheader = {'Content-Type': 'application/json; charset=UTF-8'}

class App {
    startServer;
    get;
    post;
    put;
    delete;
    genericActionAdd;
    server;
    getAction;
    serverPort;
    actionList = [];
    httpVerbs = ['GET', 'POST', 'PUT', 'DELETE']
    getActionKey = (req) => {
        let parsedURL = url.parse(req.url, true)
        return {
            method : req.method,
            path : parsedURL.pathname
        }
    }
    constructor(PORT) {
        this.serverPort = PORT;

        this.getAction = (givenKey) => {
            let action = this.actionList.find(key =>
                key.method === givenKey.method && key.path === givenKey.path
            )

            return action ? action.action : null
        }
        this.server = http.createServer((req, res) => {
            let actionKey = this.getActionKey(req)

            // TODO de implementat eroare daca am req pt o metoda http care nu o suport (ex: HEAD)
            if (this.httpVerbs.includes(actionKey.method) === false) {
                res.writeHead(500, JSONheader)
                res.end(JSON.stringify({'error' : `HTTP method ${actionKey.method} not supported`}))
                return
            }

            let action = this.getAction(actionKey)   // action = lambda
            // TODO daca nu am actiune pt "cheia" (method, path) => EROARE CORESPUNZATOARE
            if (null === action) {
                res.writeHead(500, JSONheader)
                res.end(JSON.stringify({'error' : `Action not found for ${actionKey.method}  ${actionKey.path}`}))
                return;
            }

            action(req, res)

        })

        this.startServer = (callbackOnServerListening) => {
            this.server.listen(this.serverPort, callbackOnServerListening)
        }

        this.get = (path, action) => {
            this.genericActionAdd('GET', path, action)
        }

        this.post = (path, action) => {
            this.genericActionAdd('POST', path, action)
        }

        this.put = (path, action) => {
            this.genericActionAdd('PUT', path, action)
        }

        this.delete = (path, action) => {
            this.genericActionAdd('DELETE', path, action)
        }

        this.genericActionAdd = (method, path, action) => {
            this.actionList.push({
                method : method,
                path : path,
                action : action
            })
            console.log(`${method}  ${path}`)
        }
    }

}

module.exports = App