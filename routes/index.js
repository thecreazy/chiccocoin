const express = require('express')
const router = express.Router()

const Chiccocoin = require('../middleware/chiccocoin')

const responseMiddleware = (req, res, next) => {
  return res.json(req.responseValue)
}
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Chicco Coin' })
})

router.post('/transactions/new')

router.get('/mine', Chiccocoin.mine, responseMiddleware)

router.get('/chain', Chiccocoin.getChain, responseMiddleware)

module.exports = router

