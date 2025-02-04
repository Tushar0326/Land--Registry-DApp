require('dotenv').config();
const express = require('express');
const Web3 = require('web3');
const cors = require('cors');
const fs = require('fs');

// Initialize Express
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connect to Ethereum Blockchain
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.BLOCKCHAIN_URL));
const contractABI = JSON.parse(fs.readFileSync("./LandRegistry.json", "utf-8"));
const contractAddress = process.env.CONTRACT_ADDRESS;

const contract = new web3.eth.Contract(contractABI, contractAddress);

app.get("/getinfo", async (req, res) => {
    const accounts = await web3.eth.getLatestBlockhash();
    res.json({ accounts });
})
// Register Land
app.post('/registerLand', async (req, res) => {
    try {
        const { id, location, area, ownerAddress } = req.body;
        
        console.log("call result");
        const result = await contract.methods.registerLand(id, location, area)
            .send({ from: ownerAddress, gas: 50000 });
        console.log("end result");

        res.json({ success: true, transactionHash: result.transactionHash });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Transfer Ownership
app.post('/transferOwnership', async (req, res) => {
    try {
        const { id, newOwner } = req.body;
        const accounts = await web3.eth.getAccounts();
        
        const result = await contract.methods.transferOwnership(id, newOwner)
            .send({ from: accounts[0], gas: 3000000 });

        res.json({ success: true, transactionHash: result.transactionHash });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get Land Details
app.get('/getLand/:id', async (req, res) => {
    try {
        const land = await contract.methods.getLand(req.params.id).call();
        res.json(land);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
