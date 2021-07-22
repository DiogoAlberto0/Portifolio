module.exports = app => {

    const existOrError = (value, msg) => {
        if (!value) throw msg
        if (Array.isArray(value) && value.length == 0) throw msg
        if (typeof value == 'string' && !value.trim()) throw msg
    }

    const notExistOrError = (value, msg) => {
        try {
            existOrError(value)
        } catch {
            return
        }
            throw msg
    }

    const equalsOrError = (valueA, valueB, msg) => {
        if(valueA != valueB) throw msg
    }

    return {existOrError, notExistOrError, equalsOrError}
}