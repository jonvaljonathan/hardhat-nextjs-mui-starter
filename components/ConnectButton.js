import Button from '@material-ui/core/Button';
import { connectWallet } from '../lib/connect';
import { checkIfWalletIsConnected } from '../lib/checkIfWalletIsConnected';
import { useState, useEffect } from 'react';
import { styleConnectButton } from './SharedStyles';

export const ConnectButton = (currentAccount, setConnectWallet) => {
    
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