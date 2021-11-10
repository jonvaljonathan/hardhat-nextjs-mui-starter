import React, { useEffect, useState } from "react";
import {
  styleTitleText,
  styleRaisedButton,
  styleSubText,
  styleApp,
  styleHeaderContainer,
  styleHeader,
  styleContainer,
} from "../components/SharedStyles";
import Link from "@mui/material/Link";
import theme from "../lib/theme";
import CircularProgress from "@mui/material/CircularProgress";
import SelectCharacter from "../components/nftGame/SelectCharacter";
import { connectToContract } from "../lib/connectToContract";
import { NFT_GAME_CONTRACT_ADDRESS } from "../lib/constants";
import myEpicGame from "../public/contracts/MyEpicGame.json";
import Arena from "../components/nftGame/Arena";
import { checkIfUserHasNFT } from "../lib/nftGame/checkIfUserHasNFT";
import Footer from "../components/Footer";

// Constants
const OPENSEA_LINK = "https://testnets.opensea.io/collection/heroes-ffgteisgjg";

const nftgame = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [characterNFT, setCharacterNFT] = useState();
  const [gameContract, setGameContract] = useState(null);

  const updateContract = async () => {
    const gameContract = await connectToContract(
      NFT_GAME_CONTRACT_ADDRESS,
      myEpicGame.abi
    );
    setGameContract(gameContract);
  };

  const updateUserNFT = async () => {
    const userNFT = await checkIfUserHasNFT(gameContract);
    setCharacterNFT(userNFT);
  };

  useEffect(() => {
    if (gameContract) {
      setIsLoading(true);
      updateUserNFT();
      setIsLoading(false);
    }
  }, [gameContract]);

  useEffect(() => {
    updateContract();
  }, []);

  return (
    <div style={styleApp}>
      <h1 style={styleTitleText}>Metaverse Slayer</h1>
      <p style={styleSubText}>Team up to protect the Metaverse!</p>
      {isLoading === true ? (
        <div>
          <CircularProgress align="center" />
        </div>
      ) : null}
      <div>
        {characterNFT ? (
          <Arena
            gameContract={gameContract}
            characterNFT={characterNFT}
            setCharacterNFT={setCharacterNFT}
            setIsLoading={setIsLoading}
          />
        ) : (
          <SelectCharacter
            setCharacterNFT={setCharacterNFT}
            gameContract={gameContract}
            setIsLoading={setIsLoading}
          />
        )}
        <br />
        <a
          color={theme.palette.text.primary}
          target="_blank"
          href={OPENSEA_LINK}
          rel="noopener noreferrer"
        >
          View Collection on Opensea
        </a>
      </div>
      <Footer connectedContract={gameContract} />
    </div>
  );
};

export default nftgame;
