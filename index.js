const { Arc } = require('@daostack/arc.js');
const fetch = require('node-fetch');

const graphHttpLink = 'https://api.thegraph.com/subgraphs/name/daostack/v8_1_exp_xdai';
const graphwsLink = 'wss://api.thegraph.com/subgraphs/name/daostack/v8_1_exp_xdai';
const CLOUDFUNCTIONS_URL = `https://us-central1-common-daostack.cloudfunctions.net/api/`;

const arc = new Arc({
  graphqlHttpProvider: graphHttpLink,
  graphqlWsProvider: graphwsLink,
});

function startDAOSubscription() {
  arc
    .daos({}, {subscribe: true, fetchAllData: true})
    .subscribe(async () => {
      const url = `${CLOUDFUNCTIONS_URL}update-daos`;
      const request = await fetch(url);
      if (request.status !== 200) {
        throw Error(`Error fetching ${url}: ${request.status} ${request.statusText}`);
      }
      console.log('Updated DAOs: ', request.status, request.statusText);
    });
}

startDAOSubscription();

arc.proposals({}, {subscribe: true, fetchAllData: true})
  .subscribe(async proposals => {
    proposals.map(proposal => {
      const {coreState} = proposal;
      const proposalObject = {

        boostedAt: coreState.boostedAt,
        createdAt: coreState.createdAt,
        dao: coreState.dao.id,
        description: coreState.description,
        expiresInQueueAt: coreState.expiresInQueueAt,
        executionState: coreState.executionState,
        executed: coreState.executed,
        funding: coreState.funding.toString(),
        executedAt: coreState.executedAt,
        joinAndQuit: {
          funding: coreState.funding.toString(),
          proposedMemberId: coreState.proposer,
          proposedMemberAddress: coreState.proposer,
        },
        preBoostedAt: coreState.preBoostedAt,
        id: coreState.id,
        name: coreState.name,
        proposer: coreState.proposer,
        proposerId: coreState.proposer,
        resolvedAt: coreState.resolvedAt,
        stage: coreState.stage,
        title: coreState.title,
        type: coreState.type,
        votes: {
          list: coreState.votes,
          votesAgainst: parseInt(coreState.votesAgainst),
          votesFor: parseInt(coreState.votesFor),
        },
        links: [{
          title: "website",
          url: coreState.url,
        }],
        images: [
        ],
        winningOutcome: coreState.winningOutcome,
      };
      console.log('PROPOSAL _> : : : ', proposal);
      console.log('PROPOSAL OBJECT _> : : : ', proposalObject);
    });
    const url = `${CLOUDFUNCTIONS_URL}update-proposals`;

    const request = await fetch(url);
    if (request.status !== 200) {
      throw Error(`Error fetching ${url}: ${request.status} ${request.statusText}`);
    }
    console.log('Updated Proposals: ', request.status, request.statusText);
});

// arc.plugins({}, {subscribe: true, fetchAllData: true})
//   .subscribe(async () => {
//     const url = `${CLOUDFUNCTIONS_URL}update-plugins`;
//     const request = await fetch(url);
//     if (request.status !== 200) {
//       throw Error(`Error fetching ${url}: ${request.status} ${request.statusText}`);
//     }
// });


