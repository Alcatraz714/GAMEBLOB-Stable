module.exports = func => {
    return (res, req, next) => {
        func(res, req, next).catch(next)
    }
}