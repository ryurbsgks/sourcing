const CryptoJS = require("crypto-js");
const request = require("request");

module.exports = {

  send: (tel, content) => {

    const phone = tel;
    const date = Date.now().toString();
    const serviceId = process.env.NCP_SERVICE_ID;
    const accessKey = process.env.NCP_ACCESS_KEY;
    const secretKey = process.env.NCP_SECRET_KEY;
    const myNumber = process.env.MY_NUMBER;
    const method = "POST";
    const space = " ";
    const newLine = "\n";
    const url = `https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`;
    const url2 = `/sms/v2/services/${serviceId}/messages`;
    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
    hmac.update(method);
    hmac.update(space);
    hmac.update(url2);
    hmac.update(newLine);
    hmac.update(date);
    hmac.update(newLine);
    hmac.update(accessKey);
    const hash = hmac.finalize();
    const signature = hash.toString(CryptoJS.enc.Base64);
    request({
      method: method,
      json: true,
      uri: url,
      headers: {
        "Contenc-type": "application/json; charset=utf-8",
        "x-ncp-iam-access-key": accessKey,
        "x-ncp-apigw-timestamp": date,
        "x-ncp-apigw-signature-v2": signature,
      },
      body: {
        type: "SMS",
        countryCode: "82",
        from: myNumber,
        content: content,
        messages: [{ to: `${phone}` }]
      }
    });

  }
 
};