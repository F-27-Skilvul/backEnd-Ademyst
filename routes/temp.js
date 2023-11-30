const bcrypt = require('bcryptjs')

let pass = "admin"

const saltRounds = 10
const hashPassword = bcrypt.hashSync(pass, saltRounds)
console.log(hashPassword)