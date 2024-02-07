import { ethers } from "hardhat"

async function deploy() {
  const counter = await ethers.deployContract("Counter")
  await counter.waitForDeployment()

  await counter.count()
  console.log("Counter: ", await counter.getCounter())

  return counter
}

deploy().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
