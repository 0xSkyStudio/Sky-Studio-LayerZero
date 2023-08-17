import Binance from "../libs/binance";
import accounts from "../data/account.json";

const binance = new Binance();

const sleep = (ms = 1000) => {
  setTimeout(() => {
    Promise.resolve(true);
  }, ms);
};

(async () => {
  for (let i = 0; i < accounts.length; i++) {
    console.log("Current Index:", i, accounts[i].address);
    const address = accounts[i].address;
    await binance.withdraw("BNB", address, "0.04", "BSC");
    await sleep(200);
    // await binance.withdraw("MATIC", address, 10, "MATIC");
    // await sleep(200);
    // await binance.withdraw("AVAX", address,randomNumberInRange(0.220, 0.23).toFixed(4), "AVAXC");
    // await sleep(200);
    // await binance.withdraw("ETH", address,randomNumberInRange(0.0021, 0.0022).toFixed(6), "OPTIMISM");
    // await sleep(200);
    // await binance.withdraw("ETH", address,randomNumberInRange(0.0021, 0.0022).toFixed(6), "ARBITRUM");
    // await sleep(200);
    // await binance.withdraw("USDT", address,10, "BSC");
    // await sleep(200);
  }
})();
