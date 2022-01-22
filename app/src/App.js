import React, { useState, useEffect } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';

// Constants
const TWITTER_HANDLE = 'ex_austin';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  // actions 
  const [walletAddress, setWalletAddress] = useState(null);

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom Wallet found!')
          const response = await solana.connect({ onlyIfTrusted: true })
          console.log('Connected with Public Key: ', response.publicKey.toString())
          setWalletAddress(response.publicKey.toString())
        }
      } else {
        alert('Solana object not found. Get a phantom wallet.')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const connectWallet = async () => {
    const { solana } = window
    
    if (solana) {
      const response = await solana.connect()
      console.log('Connected with Public Key:', response.publicKey.toString())
      setWalletAddress(response.publicKey.toString())
    }
  };

  const renderNotConnectedContainer = () => (
    <div className="vertical-center">
      <button 
        className="cta-button connect-wallet-button"
        onClick={connectWallet}
      >
        Connect wallet!
      </button>
    </div>
  )

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    }
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad)
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">Mint-a-Stick</p>
          <p className="sub-text">These stick men hold zero utility. They will not make you rich. HODLing will not be rewarded. All profits go to the developer. Mint now!</p>
          {!walletAddress && renderNotConnectedContainer()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          built with the rage of one thousand suns by
          <div>
            <p><a
              className="footer-text sub-text"
              href={TWITTER_LINK}
              target="_blank"
              rel="noreferrer"
            >{`@${TWITTER_HANDLE}`}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
