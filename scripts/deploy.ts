import { ethers } from "hardhat"

async function main() {
  const hello = await ethers.deployContract("HelloWorld")
  await hello.waitForDeployment()

  console.log("Say Hello: ", await hello.hello())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
