export default class Chiccocoin {
  constructor () {
    this.chain = []
    this.current_transactions = []
    this.newBlock = this.newBlock.bind(this)
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
}
