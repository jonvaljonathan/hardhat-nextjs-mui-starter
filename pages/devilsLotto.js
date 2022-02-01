import React, { useEffect, useState } from "react";
import { WAVE_PORTAL_CONTRACT_ADDRESS } from "../lib/constants";
import { connectToContract } from "../lib/connectToContract";
import WavePortal from "../public/contracts/WavePortal.json";
import { wave } from "../lib/wavePortal/wave";
import { getAllWaves } from "../lib/wavePortal/getAllWaves";
import { checkIfWalletIsConnected } from "../lib/checkIfWalletIsConnected";
import { useForm } from "react-hook-form";
import { Grid, Typography, Link } from "@mui/material";
import {styleApp, styleTitleText} from "../components/SharedStyles";
import theme from "../lib/theme";
import { CircularProgress } from "@mui/material";
import Footer from "../components/Footer";



export default function waveportal(connectProps) {
  const { register, handleSubmit } = useForm();
  const { currentAccount } = connectProps;

  const [connectedContract, setConnectedContract] = useState(null);
  const [mining, setMining] = useState(false);
  const [allWaves, setAllWaves] = useState([]);
  const [count, setCount] = useState(0);

  const updateContract = async () => {
    const connectedContract = await connectToContract(
      WAVE_PORTAL_CONTRACT_ADDRESS,
      WavePortal.abi
    );
    console.log(connectedContract);
    setConnectedContract(connectedContract);
  };

  const updateWaves = async () => {
    console.log('updateWaves');
    if (connectedContract) {
     getAllWaves(connectedContract, setAllWaves, setCount);
    }
  };

  useEffect(() => {
    updateContract();
    updateWaves();
  }, []);

  useEffect(() => {
    updateWaves();
  }, [connectedContract]);


  const onSubmit = async (data) => {
    const waveResponse = await wave(
        data.message,
        connectedContract,
        setMining,
        setCount
      );
      await updateWaves();
  };
 
  return (
    <div style={styleApp}>
        <link href="./resources/css/index.css" type="text/css" rel="stylesheet" />
        <title>Project 3</title>
    <body>
        
        <h1 class="header">Devil's Train</h1>
        <h2 class="under">Will you get lucky? Or will you get rolled?</h2>

        <p>Are you game?<br/>
        It is simple really...<br/> take a risk, if you dare...<br/>
        All you have to do is buy a ticket... <br/>the rest is <em>EASY PEASY</em></p>
        <p class="smile"><img id="smile" src="Resources/images/smile.jpg"/></p>
        <p>Once you buy your ticket wait for the train to fill<br/>
        When all the riders are on board a signal is sent and <em>away we go</em><br/>
        Patience is a virtue and by the time the train is back at the station<br/>
            you will know if the Devil's Luck was on your side...
        </p>
        <div class="container">
            <div class="center">
                <button class="button" type="button">Take a Chance</button>
            </div>
          </div>
        
    </body>
    </div> 
    )
}
