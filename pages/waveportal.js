import React, { useEffect, useState } from "react";
import { WAVE_PORTAL_CONTRACT_ADDRESS } from "../lib/constants";
import { connectToContract } from "../lib/connectToContract";
import WavePortal from "../public/contracts/WavePortal.json";
import wave from "../lib/wavePortal/wave";
import getAllWaves from "../lib/wavePortal/wave";
import { checkIfWalletIsConnected } from "../lib/checkIfWalletIsConnected";

export default function waveportal() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [connectedContract, setConnectedContract] = useState(null);
  const [mining, setMining] = useState(false);
  const [allWaves, setAllWaves] = useState([]);
  const [message, setMessage] = useState();
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);


  const updateContract = async () => {
    const connectedContract = await connectToContract(
      WAVE_PORTAL_CONTRACT_ADDRESS,
      WavePortal.abi
    );
    setConnectedContract(connectedContract);
  };
  const setCheckIfWalletIsConnected = async () => {
    setCurrentAccount(checkIfWalletIsConnected());
    console.log(currentAccount);
  };

  const updateWaves = async () => {
      if (currentAccount && connectedContract) {
      getAllWaves(connectedContract, setAllWaves);
    }
  }

  useEffect(() => {
    updateContract();
  }, []);

  useEffect(() => {
      updateWaves()
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setCheckIfWalletIsConnected();
    setIsLoading(false);
  }, []);

  const handleSubmit = async () => {
    const waveResponse = await wave(message, connectedContract, setMining, setCount);
    await updateWaves();
  };

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">👋 Hey there!</div>

        <div>
          I am Jon Valjonathan and I run a boutique old folks home and am
          working to be a Web3 Developer. Wierd right? Connect your Ethereum
          wallet and wave at me!
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            Message:
            <input
              type="text"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
          <button className="waveButton" type="submit">
            Wave at Me
          </button>
        </form>

        {mining && <p> mining tx </p>}

        {allWaves.map((wave, index) => {
          return (
            <div
              key={index}
              style={{
                backgroundColor: "OldLace",
                marginTop: "16px",
                padding: "8px",
              }}
            >
              <div>Address: {wave.address}</div>
              <div>Time: {wave.timestamp.toString()}</div>
              <div>Message: {wave.message}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
