import React, { useState } from "react";
import {styleTitleText, styleSubText, styleApp, styleHeaderContainer, styleHeader, styleContainer} from '../components/SharedStyles';
import Link from '@mui/material/Link';
import theme from '../lib/theme';
import TwitterIcon from '@mui/icons-material/Twitter';
import Grid from '@mui/material/Grid';
import FriendsCards from "../components/Friends";




// Constants
const TWITTER_HANDLE = 'jonValjonathan';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const RINKEBY_FACUET = 'https://buildspace-faucet.vercel.app/';
const RINKEBY_FACUET2 = 'https://faucet.rinkeby.io/';

const index = () => {

  const [isLoading, setIsLoading] = useState(false);

  
  return (
    <div style={styleApp}>
          <Grid container spacing={2} algin="center">
            <Grid item xs={12}>
              <h1 style={styleTitleText}>Buildspace.co Knowledge Session</h1>
              <p style={styleSubText}>
                Each unique. Each beautiful. Discover your NFT today.
              </p>
            </Grid>
              <Grid item xs={12}>
                <h1 style={styleTitleText}>Wave Portal</h1>
                <p> Deploy your first smart contract on the Rinkeby test network.</p>
                <p> Create a web3 front-end to interact with your contract.</p>
              </Grid>
              <Grid item xs={12}>
                <h1 style={styleTitleText}>Mint an NFT</h1>
                <p>Use OpenZeppelin to mint generative ERC721s.</p>
                <p>Dive further into etherjs front-ends.</p>
              </Grid>
              <Grid item xs={12}>
                <h1 style={styleTitleText}>NFT Game</h1>
                <p>Create your own mini turn-based NFT browser game.</p>
              </Grid>
              <Grid item xs={4}>
                <h1 style={styleTitleText}>Rineky Faucet</h1>
              </Grid>
              <Grid item xs={4}>
                <h1 style={styleTitleText}>Github Repo</h1>
              </Grid>
              <Grid item xs={4}>
                <h1 style={styleTitleText}>Buildspace.co</h1>
              </Grid>
              <FriendsCards />
          </Grid>          
        <div className="footer-container">
          <TwitterIcon />
          <Link color={theme.palette.text.primary}
            href={TWITTER_LINK}            
          >{`built by @${TWITTER_HANDLE}`}
          </Link>
        </div>
      </div> 
  );
};

export default index;
