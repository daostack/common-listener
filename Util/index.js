const fetch = require('node-fetch');

export const graphHttpLink = 'https://api.thegraph.com/subgraphs/name/daostack/v8_1_exp_xdai';
export const graphwsLink = 'wss://api.thegraph.com/subgraphs/name/daostack/v8_1_exp_xdai';
export const CLOUDFUNCTIONS_URL = `https://us-central1-common-daostack.cloudfunctions.net/api/`;

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