import React, { useEffect, useState } from "react";
import {styleTitleText, styleRaisedButton, styleApp} from '../components/SharedStyles';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import theme from '../lib/theme';
import TwitterIcon from '@mui/icons-material/Twitter';
import CircularProgress from '@mui/material/CircularProgress';
import { checkIfWalletIsConnected } from '../lib/checkIfWalletIsConnected';
import { askContractToMintNft } from '../lib/mintNFT/askContractToMintNft';
import { NFTzRemaining } from '../lib/mintNFT/NFTzRemaining';
import { Typography } from "@mui/material";
import Grid from '@mui/material/Grid';

// Constants
const TWITTER_HANDLE = 'jonValjonathan';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const OPENSEA_LINK = 'https://testnets.opensea.io/collection/squarenft-oecgawyrom';
const TOTAL_MINT_COUNT = 50;

const mintNFT = () => {

  const [NFTzMinted, setNFTzMinted] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");


  const setCheckIfWalletIsConnected = () => {
        setCurrentAccount(checkIfWalletIsConnected());
        console.log(currentAccount);
  }
  
  const mintNFT = async () => {
    setIsLoading(true);
    await askContractToMintNft();
    await setNFTzRemaining();
    setIsLoading(false);
  }

  const setNFTzRemaining = async () => {
    setNFTzMinted(await NFTzRemaining());
  }

    useEffect(() => {
      setNFTzRemaining();
    }, []);

    useEffect(() => {
      setCheckIfWalletIsConnected();
  }, []);

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
            <div>
              <CircularProgress align="center"/>
            </div>
          ): null}
          <Grid item xs={12}>
            <p>{NFTzMinted} / 50 NFTz Minted</p>
          </Grid>        
        { currentAccount != null ? (
            <Button onClick={mintNFT} style={styleRaisedButton}> Mint NFTz </Button>
          ) : null }
  
          </Grid>
          <br/>
            <Link color={theme.palette.text.primary}
              href={OPENSEA_LINK}>
                View Collection on Opensea
              </Link>
          <div>
            <TwitterIcon />
            <Link color={theme.palette.text.primary}
              href={TWITTER_LINK}            
            >
              {`built by @${TWITTER_HANDLE}`}
            </Link>
          </div>
    </div> 
    )
  };

export default mintNFT;