module.exports.randomString = () => {
    return Math.floor(10000 + Math.random() * 900000)
        .toString()
        .substring(0, 6)
}
