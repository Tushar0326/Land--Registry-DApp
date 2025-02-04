import React, { useState } from "react";
import { ethers } from "ethers";
import axios from "axios";

const backendURL = "http://localhost:5000";

function App() {
  const [landId, setLandId] = useState("");
  const [location, setLocation] = useState("");
  const [area, setArea] = useState("");
  const [newOwner, setNewOwner] = useState("");
  const [landDetails, setLandDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const showMessage = (msg, isError = false) => {
    setMessage({ text: msg, isError });
    setTimeout(() => setMessage(""), 3000);
  };

  const registerLand = async () => {
    try {
      setLoading(true);
      const signer = await getSigner();
      await axios.post(`${backendURL}/registerLand`, {
        id: landId,
        location,
        area,
        ownerAddress: await signer.getAddress(),
      });
      showMessage("Land Registered Successfully!", false);
    } catch (error) {
      showMessage("Error Registering Land!", true);
    } finally {
      setLoading(false);
    }
  };

  const transferOwnership = async () => {
    try {
      setLoading(true);
      await axios.post(`${backendURL}/transferOwnership`, {
        id: landId,
        newOwner,
      });
      showMessage("Ownership Transferred!", false);
    } catch (error) {
      showMessage("Error in Ownership Transfer!", true);
    } finally {
      setLoading(false);
    }
  };

  const getLandDetails = async () => {
    try {
      const response = await axios.get(`${backendURL}/getLand/${landId}`);
      setLandDetails(response.data);
    } catch (error) {
      showMessage("Land Not Found!", true);
    }
  };

  const getSigner = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    return provider.getSigner();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Land Registry DApp</h2>

        {message && (
          <div
            className={`p-3 rounded ${
              message.isError ? "bg-red-500" : "bg-green-500"
            } text-white mb-4`}
          >
            {message.text}
          </div>
        )}

        {/* Land Registration */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Register Land</h3>
          <input
            className="w-full p-2 border rounded mb-2"
            placeholder="Land ID"
            onChange={(e) => setLandId(e.target.value)}
          />
          <input
            className="w-full p-2 border rounded mb-2"
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            className="w-full p-2 border rounded mb-2"
            placeholder="Area (sq ft)"
            onChange={(e) => setArea(e.target.value)}
          />
          <button
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={registerLand}
            disabled={loading}
          >
            {loading ? "Processing..." : "Register Land"}
          </button>
        </div>

        {/* Ownership Transfer */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Transfer Ownership</h3>
          <input
            className="w-full p-2 border rounded mb-2"
            placeholder="New Owner Address"
            onChange={(e) => setNewOwner(e.target.value)}
          />
          <button
            className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            onClick={transferOwnership}
            disabled={loading}
          >
            {loading ? "Processing..." : "Transfer Ownership"}
          </button>
        </div>

        {/* Get Land Details */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Get Land Details</h3>
          <input
            className="w-full p-2 border rounded mb-2"
            placeholder="Land ID"
            onChange={(e) => setLandId(e.target.value)}
          />
          <button
            className="w-full p-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
            onClick={getLandDetails}
          >
            Fetch Land Details
          </button>

          {landDetails && (
            <div className="mt-4 p-3 bg-gray-200 rounded">
              <p><strong>Location:</strong> {landDetails[1]}</p>
              <p><strong>Area:</strong> {landDetails[2]} sq ft</p>
              <p><strong>Owner:</strong> {landDetails[3]}</p>
              <p><strong>Registered:</strong> {landDetails[4] ? "Yes" : "No"}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;


