// check username, password in post(login) request
// if exist create new JWT
// send back to front end

// set up auth so only the request with JWT can access the dashboard

const jwt = require('jsonwebtoken')
const { BadRequestError } = require('../errors')

const login = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    throw new BadRequestError('Please provide email and password')
  }

  // just for demo, always get from DB
  const id = new Date().getDate()

  // try to keep payload small, better experience for user if their connection is bad
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })

  res.status(200).json({ msg: 'User created', token })
}

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100)

  // the req.user object ios created using the auth middleware.
  // It gets imput into the route before the dashboard controller
  // and relies on the next() function to move onto this middleware

  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  })
}

module.exports = { login, dashboard }
