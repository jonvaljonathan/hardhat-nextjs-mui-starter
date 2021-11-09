import { withTheme } from '@emotion/react';
import { autocompleteClasses } from '@mui/material';
import theme from '../lib/theme';

const stylePaper = {
  backgroundColor: theme.palette.background.default,
  height: '100%',
  paddingTop: '5%',
  '&:hover': {
    padding:'4px',
  },
  maxWidth: "300px",
}

const styleMenuItem = {
  width: '100%',
  color: '#fff',
  align: 'center',
};

const styleLink = {
  color: 'white',
}

const styleRaisedButton = {
  font: '20px Muli',
  padding: '10px 30px 10px 30px',
  size: 'small',
  borderRadius: '10px',
  borderColor: 'white',
  border: '2px solid',
  color: '#fff',
  margin: 'auto',
};

const styleApp = {
  height: '100vh',
  backgroundColor:' #0d1116',
  overflow: 'scroll',
  textAlign: 'center',
  maxWidth: '1200px',
  margin: '0 auto',
}

const styleContainer = {
    margin: '0 auto',
    height: '100%',
    backgroundColor: '#0d1116',
    display: 'flex',
  } 

const styleHeaderContainer = {
    margin: '0 auto',
    maxWidth: '1200px'
  }
  
const styleHeader = {
    margin: 0,
    fontSize: '50px',
    fontWeight: 'bold',
  }
  
  const styleSubText = {
    fontSize: '25px',
    color: 'white',
  }
  
  const styleTitleText = {
    background: '-webkit-linear-gradient(left, #60c657 30%, #35aee2 60%)',
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontSize: "32px",
  }

  const styleConnectButton = {
    background: '-webkit-linear-gradient(left, #60c657, #35aee2)',
    backgroundSize: '200% 200%',
    animation: 'gradient-animation 4s ease infinite',
    color: 'white',
    fontSize: '20px',
    padding: '10px 20px',
  }
  

  
  

module.exports = {
  styleConnectButton,
  styleTitleText,
  styleRaisedButton,
  styleApp,
  styleContainer,
  styleSubText,
  styleHeader,
  styleHeaderContainer,
  styleMenuItem,
  styleLink,
  stylePaper,
};
