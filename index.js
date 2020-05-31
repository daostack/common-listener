const { Arc } = require('@daostack/arc.js');
const fetch = require('node-fetch');

const graphHttpLink = 'https://api.thegraph.com/subgraphs/name/daostack/v8_1_exp_xdai';
const graphwsLink = 'wss://api.thegraph.com/subgraphs/name/daostack/v8_1_exp_xdai';
const CLOUDFUNCTIONS_URL = `https://us-central1-common-daostack.cloudfunctions.net/api/`;

const arc = new Arc({
  graphqlHttpProvider: graphHttpLink,
  graphqlWsProvider: graphwsLink,
});

function subscribeToCommons() {
  arc
    .daos({}, { subscribe: true, fetchAllData: true })
    .subscribe(async () => {
      const url = `${CLOUDFUNCTIONS_URL}update-daos`;
      const request = await fetch(url);
      if (request.status !== 200) {
        throw Error(`Error fetching ${url}: ${request.status} ${request.statusText}`);
      }
      console.log(Date(), 'Updated DAOs: ', request.status, request.statusText);
    });
}


function subscribeToProposals() {
  arc.proposals({}, { subscribe: true, fetchAllData: true })
    .subscribe(async () => {
      try {

        const url = `${CLOUDFUNCTIONS_URL}update-proposals`;
        const request = await fetch(url);
        if (request.status !== 200) {
          throw Error(`Error fetching ${url}: ${request.status} ${request.statusText}`);
        }
        console.log(Date(), 'Updated Proposals: ', request.status, request.statusText);
      } catch (err) {
        console.error(`${Date()} ${err}`);
      }
    });
}

subscribeToCommons();
subscribeToProposals();

// arc.plugins({}, {subscribe: true, fetchAllData: true})
//   .subscribe(async () => {
//     const url = `${CLOUDFUNCTIONS_URL}update-plugins`;
//     const request = await fetch(url);
//     if (request.status !== 200) {
//       throw Error(`Error fetching ${url}: ${request.status} ${request.statusText}`);
//     }
// });


