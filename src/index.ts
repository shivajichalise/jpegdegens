import { ethers } from "ethers"
import Counter from "../artifacts/contracts/Counter.sol/Counter.json"

function getEth() {
  // @ts-ignore
  const eth = window.ethereum
  if (!eth) {
    throw new Error("Get a metamask")
  }

  return eth
}

async function hasAccounts() {
  const eth = getEth()
  const accounts = (await eth.request({
    method: "eth_requestAccounts",
  })) as string[]

  return accounts && accounts.length
}

async function requestAccounts() {
  const eth = getEth()
  const accounts = (await eth.request({
    method: "eth_accounts",
  })) as string[]

  return accounts && accounts.length
}

async function run() {
  if (!(await hasAccounts()) && !(await requestAccounts())) {
    throw new Error("No Account")
  }

  const provider = new ethers.BrowserProvider(getEth())

  const counter = new ethers.Contract(
    "0x9a676e781a523b5d0c0e43731313a708cb607508",
    Counter.abi,
    await provider.getSigner()
  )

  const el = document.createElement("div")
  async function setCounter(count?) {
    el.innerHTML = count || (await counter.getCounter())
  }
  setCounter()

  const button = document.createElement("button")
  button.innerText = "increment"
  button.onclick = async function () {
    await counter.count()
  }

  counter.on(counter.filters.CounterInc(), function (count) {
    setCounter(count.count)
  })

  document.body.appendChild(el)
  document.body.appendChild(button)
}

run()
