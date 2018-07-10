const crypto = require('crypto')

class Blockchain {
  constructor () {
    // Create chain and transaction
    this.chain = []
    this.current_transactions = []
    this.nodes = []

    // Binding of this
    this.newBlock = this.newBlock.bind(this)
    this.newTransaction = this.newTransaction.bind(this)
    this.lastBlock = this.lastBlock.bind(this)
    this.proofOfWork = this.proofOfWork.bind(this)

    // Mining  the genesis block
    this.newBlock(100, 1)
  }

  newBlock (proof, previousHash) {
    const block = {
      index: this.chain.length + 1,
      timestamp: new Date(),
      transactions: this.current_transactions,
      proof: proof,
      previous_hash: previousHash
    }
    this.current_transactions = []
    this.chain.push(block)
    return block
  }

  newTransaction (sender, recipient, amount) {
    this.current_transactions.push({
      sender: sender,
      recipient: recipient,
      amount: amount
    })
    return this.lastBlock()['index'] + 1
  }

  hash (block) {
    const blockString = JSON.stringify(block)
    const hash = crypto.createHmac(process.env.HASH_TYPE, process.env.CRYPTO_SECRET)
    .update(blockString)
    .digest('hex')

    return hash
  }

  validProof (lastProof, proof) {
    const guessHash = crypto.createHmac(process.env.HASH_TYPE, process.env.CRYPTO_SECRET)
    .update(`${lastProof}${proof}`)
    .digest('hex')
    return guessHash.substr(0, 5) === process.env.RESOLUTION_HASH
  }

  proofOfWork (lastProof) {
    let proof = 0
    while (true) {
      if (!this.validProof(lastProof, proof)) {
        proof++
      } else {
        break
      }
    }
    return proof
  }

  lastBlock () {
    return this.chain.slice(-1)[0]
  }

  registerNode(address){
    this.nodes.push(address)
    return this.nodes
  }

  validChain(chain){
    let lastBlock
    let isValid = true
    chain.forEach((block,index) => {
      if(!!index){
        lastBlock = block
        return
      }
      console.log(`lastBlock`, lastBlock)
      console.log(`block`, block)
      // Check that the hash of the block is correct
      if(block['previous_hash'] != this.hash(last_block)){
        isValid = false
      }
      // Check that the Proof of Work is correct
      if(this.validProof(lastBlock.proof, block.proof)){
        isValid = false
      }
      lastBlock = block
    });
    return isValid
  }
}

module.exports = Blockchain
