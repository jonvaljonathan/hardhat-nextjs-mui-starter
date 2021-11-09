import React, { useEffect, useState } from "react";
import {styleTitleText, styleRaisedButton, styleSubText, styleApp, styleHeaderContainer, styleHeader, styleContainer} from '../components/SharedStyles';
import Link from '@mui/material/Link';
import theme from '../lib/theme';
import TwitterIcon from '@mui/icons-material/Twitter';
import CircularProgress from '@mui/material/CircularProgress';
import { checkIfWalletIsConnected } from '../lib/checkIfWalletIsConnected';
import { ConnectButton } from '../components/ConnectButton';
import SelectCharacter from '../components/nftGame/SelectCharacter';
import { connectToContract } from "../lib/connectToContract";
import { NFT_GAME_CONTRACT_ADDRESS } from "../lib/constants";
import myEpicGame from '../public/contracts/MyEpicGame.json';
import Arena from "../components/nftGame/Arena";
import { checkIfUserHasNFT } from '../lib/nftGame/checkIfUserHasNFT';




// Constants
const TWITTER_HANDLE = 'jonValjonathan';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const OPENSEA_LINK = 'https://testnets.opensea.io/collection/squarenft-oecgawyrom';
const TOTAL_MINT_COUNT = 50;

const nftgame = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [characterNFT, setCharacterNFT] = useState();
  const [gameContract, setGameContract] = useState(null);

    const updateContract = async () => {
        const gameContract = await connectToContract(NFT_GAME_CONTRACT_ADDRESS, myEpicGame.abi)
        setGameContract(gameContract);
    };


  const setCheckIfWalletIsConnected = () => {
        setCurrentAccount(checkIfWalletIsConnected());
        console.log(currentAccount);
  };

  const updateUserNFT = async () => {
    const userNFT = await checkIfUserHasNFT(gameContract);
    setCharacterNFT(userNFT);
  }
  
  useEffect(() => {
    if (currentAccount && gameContract) {
        setIsLoading(true);
        updateUserNFT();
        setIsLoading(false);
    }
  }, [currentAccount, gameContract]);

  useEffect(() => {
    updateContract();
    }, [])

  

    useEffect(() => {
      setIsLoading(true);
      setCheckIfWalletIsConnected();
      setIsLoading(false);
  }, []);

  return (
    <div style={styleApp}>
          <h1 style={styleTitleText}>Metaverse Slayer</h1>
          <p style={styleSubText}>
          Team up to protect the Metaverse!
          </p>
        {isLoading === true? (
          <div>
            <CircularProgress align="center"/>
          </div>
        ): null}
        <div>
        { currentAccount === '' ? (
          <ConnectButton />
        ) : null }
        { currentAccount && characterNFT && currentAccount ? (
            <Arena gameContract={gameContract} currentAccount={currentAccount} characterNFT={characterNFT} setCharacterNFT={setCharacterNFT} setIsLoading={setIsLoading}/>
        ) :
          <SelectCharacter setCharacterNFT={setCharacterNFT} gameContract={gameContract} setIsLoading={setIsLoading}/>
        }
        <br/>
          <Link color={theme.palette.text.primary}
            href={OPENSEA_LINK}>
              View Collection on Opensea 
            </Link>
        </div>
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

export default nftgame;