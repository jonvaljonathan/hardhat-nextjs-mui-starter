
import React, { useEffect, useState } from 'react';
import { transformCharacterData } from '../../lib/transformCharacterData';
import Link from 'next/link';
import Image from 'next/dist/client/image';
import Grid from '@mui/material/Grid';
import { Button, Paper } from '@mui/material';
import { Typography } from '@mui/material';
import {stylePaper, styleRaisedButton } from '../SharedStyles';
import { transformBoss } from '../../lib/transformBoss';

/*
 * We pass in our characterNFT metadata so we can a cool card in our UI
 */
const Arena = ({ characterNFT, gameContract, setCharacterNFT, setIsLoading }) => {
  console.log('ARENA');
  console.log(characterNFT);
  const [boss, setBoss] = useState(null);
  const [attackState, setAttackState] = useState('null');

  const fetchBoss = async () => {
      const bossTxn = await gameContract.getBigBoss();
      console.log('Boss:', bossTxn);
      setBoss(transformBoss(bossTxn));
      console.log('transformedBoss');
      console.log(boss);
  }  

  const runAttackAction = async () => {
      try {
          if (gameContract) {
              setAttackState('attacking');
              console.log('attacking boss');
              setIsLoading(true);
              const attackTxn = await gameContract.attackBoss();
              await attackTxn.wait();
              console.log('attackTxn:', attackTxn);
              setAttackState('hit');
              setIsLoading(false);    
            }
            
  } catch (error) {
    console.error('Error attacking boss:', error);
    setAttackState('');
    }
  }

  const callOnAttackComplete = () => {
    
    const bossHp = bossHp - characterNFT.attackDamage;
    const playerHp = characterNFT.hp - boss.attackDamage;

    console.log(`AttackComplete: Boss Hp: ${bossHp}`);

    /*
    * Update both player and boss Hp
    */
    setBoss((prevState) => {
        return { ...prevState, hp: bossHp };
    });

    setCharacterNFT((prevState) => {
        return { ...prevState, hp: playerHp };
    });
    };

  useEffect(() => {
      if (gameContract) {
        fetchBoss();
        gameContract.on('AttackComplete', callOnAttackComplete);
      }
  }, [gameContract]);  

  return (
    <div>
      { boss && characterNFT ? (
      <Grid container spacing={2} align="center">
                        <Grid item xs={6}>
                            <Paper style={stylePaper}>
                                <Typography variant='h4'>
                                    {boss.name}
                                </Typography>
                                <Typography>
                                   { `HP: ${boss.hp} / ${boss.maxHp}`}
                                </Typography>
                                <Typography>
                                    {`Attack Damage: ${boss.attackDamage}`}
                                </Typography>
                                <Image width={"350px"} height={"350px"} src={boss.imageURI} alt={`${boss.name} logo`}/>
                                <Button onClick={runAttackAction} style={styleRaisedButton}>
                                    {`Attack ${boss.name}`}
                                </Button>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper style={stylePaper}>
                                <Typography variant='h4'>
                                    {characterNFT.name}
                                </Typography>
                                <Image width={"350px"} height={"350px"} src={characterNFT.imageURI} alt={`${characterNFT.name} logo`}/>
                                <Typography>
                                   { `HP: ${characterNFT.hp} / ${characterNFT.maxHp}`}
                                </Typography>
                                <Typography>
                                    {`Attack Damage: ${characterNFT.attackDamage}`}
                                </Typography>
                            </Paper>
                        </Grid>
                </Grid>
      ) : null }
    </div>
  );
};

export default Arena;