// this file is for configuring the network and deployment of smart contract 

// hardhat-waffle is used for building smart contract tests 
require('@nomiclabs/hardhat-waffle');

module.exports ={
  solidity: "0.8.0",
  // this is the test network known as Ropsten I signed up on alchemy.com which deploys our smart contract 
  networks: {
    ropsten: {
      // this is the view key of Ocean app on which the smart contract is to be deployed 
      url: 'https://eth-ropsten.alchemyapi.io/v2/s1EdhTk2pwpeeodg-LfQ5aDmzA-r9XdF',
      // this👇 accounts value is my private key of my metamask account 
      accounts:['ee9455279433d0ec32d558a1cb3f033bcc0af73cb88b59742cc44d213022b24c']
    }
  }
}
