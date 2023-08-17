import ethers from"ethers"
import ERC20_ABI from"./erc20_abi.js"
import stgConfig from"./stg_map.js"

const { Wallet } = ethers;

class WatchErc20 {
  constructor(privateKey) {
    this.privateKey = privateKey;
    this.wallet = new Wallet(privateKey);
  }

  async queryChainErc20() {
    const res = {};
    try{
      for (let chain in stgConfig) {
        console.log(`Query ${chain} chain USDT`);
  
        const { provider, erc20, erc20Decimals } = stgConfig[chain];
        const stgProvider = new ethers.providers.JsonRpcProvider(provider);
        this.wallet = new Wallet(this.privateKey, stgProvider);
        const erc20Contract = new ethers.Contract(erc20, ERC20_ABI, this.wallet);
  
        const usdt = await this.getErc20Balance(
          erc20Contract,
          this.wallet.address,
          erc20Decimals
        );
        if (usdt > 0) {
          res[chain] = usdt;
        }
      }
      return res;
    }catch(e){
      console.log("error info", e);
    }
  }

  async getErc20Balance(contract, address, erc20Decimals) {
    const res = await contract.balanceOf(address);
    console.log("USDT余额", ethers.utils.formatUnits(res, erc20Decimals));
    return ethers.utils.formatUnits(res, erc20Decimals);
  }
}

export default WatchErc20;
