import Okx from "../libs/okx";
import accounts from "../data/account.json";

const okx = new Okx();
const res = [];

(async () => {
  for (let i = 1; i < accounts.length; i++) {
    // console.log(accounts[i].address);
    const usdtRandom = (1 + Math.random() * 0.5).toFixed(2);
    const usdtArbRandom = (6 + Math.random() * 0.5).toFixed(2);
    const maticRandom = (1 + Math.random() * 0.1).toFixed(2);
    const ethRandom = (0.00389 + Math.random() * 0.000006).toFixed(6);
    res.push(accounts[i]);
    // continue;
    // const number = randomNumberInRange(8,9.3);
    // const withdrawAmount = number.toFixed(1)
    // console.log("Transfer amount", withdrawAmount, accounts[i].address);
    console.log("start", accounts[i].address);
    await okx.withdraw(
      "USDT",
      usdtRandom,
      accounts[i].address,
      "USDT-Polygon",
      "0.8"
    );
    // await okx.withdraw("MATIC", maticRandom, accounts[i].address, "MATIC-Polygon", "0.48");
    // await okx.withdraw("ETH", ethRandom, accounts[i].address, "ETH-Arbitrum one", "0.0001");
    // await okx.withdraw("USDT", usdtArbRandom, accounts[i].address, "USDT-Arbitrum one", "0.1");
    // await okx.getChainName();
  }
})();
