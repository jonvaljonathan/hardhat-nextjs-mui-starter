import { SettingsCellOutlined } from "@mui/icons-material";

export const getAllWaves = async (connectedContract, setAllWaves) => {
  try {
    const waves = await connectedContract.getAllWaves();
    const count = await connectedContract.getTotalWaves();

    let wavesCleaned = [];
    waves.forEach((wave) => {
      wavesCleaned.push({
        address: wave.waver,
        timestamp: new Date(wave.timestamp * 1000),
        message: wave.message,
      });
    });

    setAllWaves(wavesCleaned);
    setCount(count);
  } catch (error) {
    console.log(error);
  }
};
