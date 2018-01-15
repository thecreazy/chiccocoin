const Blockchain = require('./blockchain')

class Chiccocoin {
  constructor () {
    this.blockchain = new Blockchain()
    this.getChain = this.getChain.bind(this)
    this.mine = this.mine.bind(this)
  }
  getChain (req, res, next) {
    req.responseValue = this.blockchain.chain
    return next()
  }

  mine (req, res, next) {
    const lastBlock = this.blockchain.lastBlock()
    const lastProof = lastBlock.proof
    const proof = this.blockchain.proofOfWork(lastProof)

    // Create a new transaction with from 0 (this node) to our node (NODE_NAME) of 1 chiccocoin
    this.blockchain.newTransaction('0', process.env.NODE_NAME, 1)

    // Forge the new Block by adding it to the chain
    const previousHash = this.blockchain.hash(lastProof)
    const newBlock = this.blockchain.newBlock(proof, previousHash)

    const responseValue = Object.assign({
      message: 'New Block mined'
    }, newBlock)
    req.responseValue = responseValue
    return next()
  }
}

module.exports = new Chiccocoin()
