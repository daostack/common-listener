const fetch = require('node-fetch');
const { CLOUDFUNCTIONS_URL} = require("../settings");

export const handleObjectSubscribe = (endPointName) => {
    try {
        const url = `${CLOUDFUNCTIONS_URL}${endPointName}`;
        const request = await fetch(url);
        if (request.status !== 200) {
          throw Error(`Error fetching ${url}: ${request.status} ${request.statusText}`);
        }
        console.log(Date(), `Endpoint (${endPointName}) response: `, request.status, request.statusText);
      } catch (err) {
        console.error(`Error in ${endPointName} ${Date()} ${err}`);
      }
}