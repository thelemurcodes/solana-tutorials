import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="check-balance"
export default class extends Controller {
  static targets = ['input', 'results']
  connect() {
    console.log("hello")
  }

  displayBalance(balance) {
    const displayBalance = `<p>SOL Balance: ${balance / solanaWeb3.LAMPORTS_PER_SOL}</p>`
    this.resultsTarget.insertAdjacentHTML('beforeend', displayBalance)
  }

  displayAddress(key) {
    const displayAddress = `<p>SOL Address: ${key}</p>`
    this.resultsTarget.insertAdjacentHTML('beforeend', displayAddress)
  }

  displayExecutable(info) {
    const displayExecutable = `<p>Is Executable? ${info?.executable}</p>`
    this.resultsTarget.insertAdjacentHTML('beforeend', displayExecutable)
  }

  check(event) {
    event.preventDefault()
    try {
      const key = new solanaWeb3.PublicKey(this.inputTarget.value)
      const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'))

      connection.getBalance(key).then(balance => {
        this.displayBalance(balance)
        this.displayAddress(key)
      })
      connection.getAccountInfo(key).then(info => {
        this.displayExecutable(info)
      })
    } catch (error) {
      this.displayBalance(0)
      this.displayAddress('')
      this.displayExecutable('')
      alert(error)
    }

  }
}
