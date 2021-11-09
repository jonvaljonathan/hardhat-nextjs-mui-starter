import Button from '@material-ui/core/Button';
import { styleConnectButton } from './SharedStyles';

export const ConnectButton = (currentAccount, setConnectWallet) => {
    console.log({currentAccount});
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