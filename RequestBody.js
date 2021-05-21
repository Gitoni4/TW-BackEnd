const url = require('url')
const querystring = require('querystring')

class RequestBody {
    method
    path
    qsParams
    constructor(req) {
        this.method = req.method
        this.path = req.url.pathname

        let qString = req.url.split('?')

        this.qsParams = querystring.parse(qString[1])
        //
    }
}

module.exports = RequestBody