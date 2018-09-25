import gql from 'graphql-tag'
import 'cross-fetch/polyfill'
import ApolloClient from 'apollo-boost'

const g = gql`
  {clutterType(nodeId : "WyJjbHV0dGVyX3R5cGVzIiwxXQ==") {
    description
    }
  }
`

describe('simple', () => {
  test('gql tag - simple', () => {
    const client = new ApolloClient({
      uri: 'http://localhost:5000/graphql'
    })
    return client.query({
        query: g
      })
      .then(data => console.log(data))
  })
})
