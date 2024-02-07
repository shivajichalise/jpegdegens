import { ethers } from "hardhat"
import { expect } from "chai"

describe("Hello World", function () {
  it("should get the hello world", async function () {
    const hello = await ethers.deployContract("HelloWorld")
    await hello.waitForDeployment()

    expect(await hello.hello()).to.equal("Hello, World")
  })
})
