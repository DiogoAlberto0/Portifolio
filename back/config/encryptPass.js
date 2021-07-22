const bcrypt = require('bcrypt-nodejs')

module.exports = password => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}