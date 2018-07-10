const express = require('express')
const router = express.Router()
const { check } = require('express-validator/check')

const Chiccocoin = require('../middleware/chiccocoin')

const responseMiddleware = (req, res, next) => {
  return res.json(req.responseValue)
}
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Chicco Coin' })
})

router.post('/transactions/new', [
  check('sender', 'Sender must be a String').exists(),
  check('recipient', 'Sender must be a String').exists(),
  check('amount', 'Sender must be a Int Value').isInt().exists()
], Chiccocoin.newTransaction, responseMiddleware)

router.get('/mine', Chiccocoin.mine, responseMiddleware)

router.get('/chain', Chiccocoin.getChain, responseMiddleware)

router.post('/node/register', [
  check('node', 'Node must be a String').exists()
], Chiccocoin.addNode, responseMiddleware)

module.exports = router
