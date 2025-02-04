const express = require("express");
const { web3, contract } = require("./web3");

const app = express();
app.use(express.json());

// ✅ Register Land
app.post("/registerLand", async (req, res) => {
  try {
    const { id, location, area, ownerAddress } = req.body;
    const accounts = await web3.eth.getAccounts();
    
    await contract.methods.registerLand(id, location, area).send({
      gas: 500000,
    });

    res.json({ success: true, message: "Land registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error registering land" });
  }
});

// ✅ Transfer Ownership
app.post("/transferOwnership", async (req, res) => {
  try {
    const { id, newOwner } = req.body;
    const accounts = await web3.eth.getAccounts();

    await contract.methods.transferOwnership(id, newOwner).send({
      from: accounts[0],
      gas: 500000,
    });

    res.json({ success: true, message: "Ownership transferred successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error in ownership transfer" });
  }
});

// ✅ Fetch Land Details
app.get("/getLand/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const land = await contract.methods.getLand(id).call();
    res.json(land);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Land not found" });
  }
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
