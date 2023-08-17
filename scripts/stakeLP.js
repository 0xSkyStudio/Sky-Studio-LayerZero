import Stargate from "node-stargate";
import accounts from "../data/account.json" assert { type: 'json' };
import { sleep } from "../libs/util.js";

async function stakeLP() {
  const shuffleAccounts = [...accounts];
  let success = 0;
  let i = 0;
  let account;

  console.log("Start staking LP~");
  while ((account = shuffleAccounts.shift()) && i < accounts.length) {
    console.log("Current Task:", i);
    const stg = new Stargate(account.privateKey);

    try {
      await stg.stakeLP();
      success++;
    } catch {}
    await sleep(100);
    i++;
  }
  console.log("The number of successful pledged liquidity is", success);
}

stakeLP();
