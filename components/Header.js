import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {ConnectButton} from './ConnectButton';
import HeaderMenu from './HeaderMenu';
import Grid from '@mui/material/Grid';
import {styleHeaderContainer} from './SharedStyles';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static" style={{align:'center' }}>
        <Toolbar>
            <Grid container direction="row" justifyContent="space=around" style={styleHeaderContainer}>
                <Grid item xs={3}>
                    <HeaderMenu />
                </Grid>
                <Grid item xs={6}>
                </Grid>
                
                <Grid item xs={3}> 
                    <ConnectButton />
                </Grid>
            </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}