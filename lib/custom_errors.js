class DocumentNotFoundError extends Error {
    constructor () {
        super()
        this.name = "DocumentNotFoundError"
        this.message + "The ID provided doesn't match any on file"
    }
}

const handle404 = (record) => {
    if(!record) {
        throw new DocumentNotFoundError()
    }else{
        return record
    }
}

module.exports = {
    handle404
}