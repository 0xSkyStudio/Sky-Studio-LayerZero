import Stargate from "node-stargate";
import accounts from "../data/account.json" assert { type: 'json' };
import { sleep } from "../libs/util.js";

async function crossChain(chainName) {
  const targetChains = [
    "arb",
    "polygon",
    "op",
    "bsc",
    "avalanche",
    "fantom",
  ].filter((item) => item !== chainName);
  const shuffleAccounts = [...accounts];
  let success = 0;
  let i = 0;
  let account;

  console.log("start~");
  while ((account = shuffleAccounts.shift()) && i < accounts.length) {
    console.log("Current Task:", i);
    for (let i = 0; i < targetChains.length; i++) {
      try {
        const stg = new Stargate(
          account.privateKey,
          chainName,
          targetChains[i]
        );
        await stg.startCrossChain();
        success++;
      } catch (e) {
        console.log(e.message);
        shuffleAccounts.push(account);
      }
    }
    await sleep(100);
    i++;
  }
  console.log("The number of successful cross-chain transactions.", success);
}

crossChain("polygon");
