const env = require('./env/env.json');
const graphHttpLink = `https://api.thegraph.com/subgraphs/name/daostack/${env.graphVersion}`;
const graphwsLink = `wss://api.thegraph.com/subgraphs/name/daostack/${env.graphVersion}`;
const CLOUDFUNCTIONS_URL = env.cloudFunctionURL;

module.exports = {
  graphHttpLink,
  graphwsLink, 
  CLOUDFUNCTIONS_URL
};