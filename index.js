const { Arc } = require('@daostack/arc.js');
const fetch = require('node-fetch');

const graphHttpLink =
  'https://api.thegraph.com/subgraphs/name/daostack/v7_5_exp_rinkeby';
const graphwsLink =
  'wss://api.thegraph.com/subgraphs/name/daostack/v7_5_exp_rinkeby';

const arc = new Arc({
  graphqlHttpProvider: graphHttpLink,
  graphqlWsProvider: graphwsLink,
});

arc
  .daos({}, {subscribe: true, fetchAllData: true})
  .subscribe(async () => {
    try {
      // const request = await fetch('http://localhost:5001/common-daostack/us-central1/api/update-daos');
      const request = await fetch('https://us-central1-common-daostack.cloudfunctions.net/api/update-daos');
      console.log('Updated DAOs: ', request.status, request.statusText);
    } catch (e) {
      console.log('Error: ', e);
    }
  });

