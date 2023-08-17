import fetch from "node-fetch";
import CryptoJS from "crypto-js";
import { apiKey, secretKey, Passphrase } from "../config/okx.json"  assert { type: 'json' };

const BASE_URI = "https://aws.okx.com";

class Okx {
  fetchWrapper(uri, options = {}) {
    const now = new Date().toJSON();
    console.log(uri, options);
    const signURI = options.method === "POST" ? uri + options.body : uri;
    return fetch(`${BASE_URI}${uri}`, {
      ...options,
      headers: {
        ...options.headers,
        "content-type": "application/json",
        "OK-ACCESS-KEY": apiKey,
        "OK-ACCESS-SIGN": this.sign(now, options.method || "GET", signURI),
        "OK-ACCESS-TIMESTAMP": now,
        "OK-ACCESS-PASSPHRASE": Passphrase,
      },
    });
  }

  /**
   * sign
    OK-ACCESS-SIGN = timestamp + method + requestPath + body string (+ means string connection), and SecretKey, which is encrypted using HMAC SHA256 method and output through Base-64 encoding.
    eg：sign=CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(timestamp + 'GET' + '/api/v5/account/balance?ccy=BTC', SecretKey))
    among them the value of timestamp is the same as the ok access timestamp request header which is the iso format such as 2020 12 08 t09 08 57 715z
   */
  sign(timestamp, method = "GET", req) {
    const encodeData = `${timestamp}${method}${req}`;
    const data = CryptoJS.enc.Base64.stringify(
      CryptoJS.HmacSHA256(encodeData, secretKey)
    );

    return data;
  }

  async getBalance(ccy) {
    let requestPATH = "/api/v5/account/balance";
    if (ccy) {
      requestPATH += "?ccy=" + ccy.toUpperCase();
    }
    const res = await this.fetchWrapper(requestPATH);
    const data = await res.json();
    console.log(data);
    return data;
  }

  async withdraw(
    ccy,
    amt,
    toAddr,
    chain = "ETH-Arbitrum one",
    fee = "0.0001",
    dest = 4
  ) {
    const requestPATH = "/api/v5/asset/withdrawal";
    const res = await this.fetchWrapper(requestPATH, {
      method: "POST",
      body: JSON.stringify({
        amt: amt,
        ccy: ccy.toUpperCase(),
        toAddr: toAddr,
        fee: fee,
        chain: chain,
        dest: dest,
      }),
    });
    const data = await res.json();
    return data;
  }
}

module.exports = Okx;
