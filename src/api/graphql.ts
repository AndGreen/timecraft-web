import { request as graphqlRequest } from 'graphql-request';
import { Variables } from 'graphql-request/dist/src/types';

const userId = '2f2a0649-121d-45d3-9004-01236eaf3e20';

export const userPushDataQuery = `
mutation update_users($data: json, $sync_date: timestamptz){
  update_users(where:{id: {_eq: "${userId}"}}, _set:{
    data: $data,
    sync_date: $sync_date
  }) {
    affected_rows,
    returning {
      sync_date
    }
  }
}
`;

export const userPullDataQuery = `{
  users(where: {id: {_eq: "${userId}"}}) {
    id,
    name,
    sync_date,
    data
  }
}
`;

export const request = (query: string, variables?: Variables) => {
  return graphqlRequest(
    'https://smoothyapp.herokuapp.com/v1/graphql',
    query,
    variables,
  );
};
