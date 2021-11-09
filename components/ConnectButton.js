import Button from '@material-ui/core/Button';
import { styleConnectButton } from './SharedStyles';
import { checkIfWalletIsConnected } from '../lib/checkIfWalletIsConnected';

export const ConnectButton = (currentAccount, setConnectWallet) => {
    console.log('connect button');
    console.log(currentAccount);
    return (
    <div>
        {currentAccount === "" ? (
            <Button style={styleConnectButton} onClick={setConnectWallet}> Connect to MetaMask </Button>
        ) : (
            <Button style={styleConnectButton}> Connected</Button>
        )}
    </div>
    )
}