import { ethers } from "ethers"
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
    "0x5fbdb2315678afecb367f032d93f642f64180aa3",
    [
      "function count() public",
      "function getCounter() public view returns (uint32)",
    ],
    await provider.getSigner()
  )

  const el = document.createElement("div")
  async function setCounter() {
    el.innerHTML = await counter.getCounter()
  }
  setCounter()

  const button = document.createElement("button")
  button.innerText = "increment"
  button.onclick = async function () {
    const tx = await counter.count()
    await tx.wait()
    setCounter()
  }

  document.body.appendChild(el)
  document.body.appendChild(button)
}

run()
