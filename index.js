const { Arc, Vote } = require('@daostack/arc.js');

import {graphHttpLink, graphwsLink, handleObjectSubscribe} from './Util'

const arc = new Arc({
  graphqlHttpProvider: graphHttpLink,
  graphqlWsProvider: graphwsLink,
});

function subscribeToCommons() {
  arc
    .daos({}, { subscribe: true, fetchAllData: true })
    .subscribe(async () => {
      handleObjectSubscribe('update-daos');
    });
}


function subscribeToProposals() {
  arc.proposals({}, { subscribe: true, fetchAllData: true })
    .subscribe(async () => {
      handleObjectSubscribe('update-proposals');
    });
}


function subscribeToVotes() {
  const members = await Vote.search(arc, {}, { subscribe: true, fetchAllData: true });
  members.subscribe(async () => {
    handleObjectSubscribe('update-votes');
  });
}

subscribeToCommons();
subscribeToProposals();
subscribeToVotes();

// arc.plugins({}, {subscribe: true, fetchAllData: true})
//   .subscribe(async () => {
//     const url = `${CLOUDFUNCTIONS_URL}update-plugins`;
//     const request = await fetch(url);
//     if (request.status !== 200) {
//       throw Error(`Error fetching ${url}: ${request.status} ${request.statusText}`);
//     }
// });


