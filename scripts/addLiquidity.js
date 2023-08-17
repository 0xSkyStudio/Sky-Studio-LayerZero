import Stargate from "node-stargate";
import WatchErc20 from "../libs/watch.js";
import accounts from "../data/account.json" assert { type: 'json' };
import configs from "../libs/stg_map.js";
import { sleep, getRandomElement } from "../libs/util.js";

/**
 * English
 * Runs the swap process for adding liquidity to a pool.
 * Iterates through a list of pool accounts and performs the swap operation.
 * Logs the progress and results of each swap.
 * @returns {Promise<void>} - A promise that resolves when the swap process is complete.
 *
 * 中文
 * 运行添加流动性到池子的交换过程。
 * 遍历池子账户列表并执行交换操作。
 * 记录每次交换的进度和结果。
 * @returns {Promise<void>} - 当交换过程完成时解析的Promise。
 */
async function addLiquidity() {
  const shuffleAccounts = [...accounts];
  let success = 0;
  let i = 0;
  let account = {}

  while ((account = shuffleAccounts.shift()) && i < accounts.length) {
    const getTokens = new WatchErc20(account.privateKey);
    const usdtTokens = await getTokens.queryChainErc20();
    console.log(usdtTokens);
    if (Object.keys(usdtTokens).length === 0) return;

    const sources = Object.keys(usdtTokens).filter((t) => +usdtTokens[t] > 1);
    const source = sources[0];
    const others = Object.keys(configs).filter((t) => t !== source);
    const target = getRandomElement(others);
    console.log(account.address, "from", source, "to", target);

    const stg = new Stargate(account.privateKey, source, target);
    try {
      await stg.addLiquidity();
      success++;
    } catch (e) {
      console.log(e.message);
      shuffleAccounts.push(account);
    }
    await sleep(100);
    i++;
  }
}

addLiquidity();
