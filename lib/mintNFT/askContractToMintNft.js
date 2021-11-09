import { MINT_NFT_CONTRACT_ADDRESS } from '../constants'
import { connectToContract } from "../connectToContract";
import myEpicNft from '../../public/contracts/MyEpicNFT.json';

export const askContractToMintNft = async () => {
    try {
        const connectedContract = await connectToContract(MINT_NFT_CONTRACT_ADDRESS, myEpicNft.abi);

        console.log({connectedContract});
        console.log("Going to pop wallet now to pay gas...")
        let nftTxn = await connectedContract.makeAnEpicNFT();
       
        connectedContract.on("NewEpicNFTMinted", (from, tokenId) => {
          console.log('NewEpicNFTMinted');
          console.log({tokenId});
        });
        console.log("Mining...please wait.")
        await nftTxn.wait();

        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
        
        
        console.log({NFTzMinted})
    } catch (error) {
      console.log(error)
    }
  }