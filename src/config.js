module.exports = process.env.NODE_ENV === 'production' ? { // production
  GRAPHQL_URL: window.location.hostname === '.io' ? '/graphql' : '/graphqltest', //coz CRA build production only
} : { // development & test
  GRAPHQL_URL: '/graphql',
}
