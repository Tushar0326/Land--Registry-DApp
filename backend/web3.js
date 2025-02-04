require("dotenv").config();
const Web3 = require("web3");
const fs = require("fs");

// ✅ Use `createHttpProvider` for Web3.js v4+
const { createHttpProvider } = require("web3");

// ✅ Connect to Ethereum using Infura
const provider = new Web3.providers.HttpProvider(process.env.BLOCKCHAIN_URL);
const web3 = new Web3(provider);

// ✅ Load Contract ABI
const contractABI = JSON.parse(fs.readFileSync("../build/contracts/LandRegistry.json", "utf8"));
const contractAddress = process.env.CONTRACT_ADDRESS;

// ✅ Create Contract Instance
const contract = new web3.eth.Contract(contractABI, contractAddress);
console.log(contract);

// ✅ Export for use in `index.js`
module.exports = { web3, contract };
