import { apiKey, secretKey } from "../../config/binance.json"  assert { type: 'json' };
import { Spot } from "@binance/connector";

class BinanceAPI {
  constructor() {
    this.client = new Spot(apiKey, secretKey);
  }
  async withdraw(coin, address, amount, network) {
    const res = await this.client.withdraw(coin, address, amount, {
      network,
      name: "",
      walletType: 0,
    });
    console.log(address, coin, res.data);
  }
}

export default BinanceAPI;
