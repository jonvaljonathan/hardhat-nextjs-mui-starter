export const wave = async (message, connectedContract, setMining, setCount) => {
    console.log('WAVE');
    try {

        const waveTxn = await conectedContract.wave(message);
        console.log("Mining...", waveTxn.hash);

        setMining(true);
        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);


        count = await connectedContract.getTotalWaves();
        console.log('Retrieved total wave count...', count.toNumber());
        setMining(false);
        setCount(count);
    } catch (error) {
      console.log(error)
    }
}