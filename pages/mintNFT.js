import React, { useEffect, useState } from "react";
import {styleTitleText, styleRaisedButton, styleApp} from '../components/SharedStyles';
import Button from '@mui/material/Button';
import theme from '../lib/theme';
import CircularProgress from '@mui/material/CircularProgress';
import { askContractToMintNft } from '../lib/mintNFT/askContractToMintNft';
import { NFTzRemaining } from '../lib/mintNFT/NFTzRemaining';
import { Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import Footer from "../components/Footer";
import { MINT_NFT_CONTRACT_ADDRESS } from "../lib/constants";
import { connectToContract } from "../lib/connectToContract";
import myEpicNft from '../public/contracts/MyEpicNFT.json';

// Constants
const OPENSEA_LINK = 'https://testnets.opensea.io/collection/squarenft-6jh3gynj0m';

const mintNFT = (currentAccount) => {

  const [NFTzMinted, setNFTzMinted] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [connectedContract, setConnectedContract] = useState(null);

  const updateContract = async () => {
    const connectedContract = await connectToContract(
      MINT_NFT_CONTRACT_ADDRESS,
      myEpicNft.abi
    );
    console.log(connectedContract);
    setConnectedContract(connectedContract);
  };

  
  const mintNFT = async () => {
    setIsLoading(true);
    await askContractToMintNft(connectedContract);
    await setNFTzRemaining();
    setIsLoading(false);
  }

  const setNFTzRemaining = async () => {
    setNFTzMinted(await NFTzRemaining());
  }

  useEffect(() => {
    updateContract();
    setNFTzRemaining();
  }, []);

    useEffect(() => {
      setNFTzRemaining();
    }, [currentAccount, connectedContract]);

  return (
      <div style={styleApp}>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{paddingTop:"5%"}}>
            <Typography variant='h1' style={styleTitleText}>
              Mint Your First NFT Project
            </Typography>
            <Typography variant='body1'>
              Create generative NFTs and view them on opensea.
            </Typography>
          </Grid>
          {isLoading === true? (
            <Grid item xs={12} style={{paddingTop:"5%"}}>
              <CircularProgress align="center"/>
            </Grid>
          ): null}
          <Grid item xs={12}>
            <p>{NFTzMinted} / 50 NFTz Minted</p>
          </Grid>        
        { currentAccount != null ? (
            <Button onClick={mintNFT} style={styleRaisedButton}> Mint NFTz </Button>
          ) : null }
  
          </Grid>
          <br/>
            <a color={theme.palette.text.primary} target="_blank" 
              href={OPENSEA_LINK}>
                View Collection on Opensea
              </a>
              <Footer connectedContract={connectedContract} />

    </div> 
    )
  };

export default mintNFT;