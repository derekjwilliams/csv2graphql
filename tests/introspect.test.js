// import { TransformTemplate, Transformation} from '../lib/transformTemplate'
// import Transformer from '../lib/transformer'

import { graphql, buildSchema } from 'graphql'
import fetch from 'node-fetch'
import fs from 'fs'
import { introspectionQuery } from '../utility/introspectionQueries'

const defaultTestURL = 'http://localhost:5000/graphql'
describe('Load Schema From URL', () => {
  test('load schema', () => {
    fetch(defaultTestURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: introspectionQuery })
    })
      .then(result => result.json())
      .then((result) => {
        fs.writeFileSync('result.json', JSON.stringify(result.data, null, 2))
      })
  })
})

describe('GQL Library Sanity Test', () => {
  test('gql getting started', () => {
    expect.assertions(1)
    const schema = buildSchema(`
      type Query {
        k: String
      }
  `)

    // The root provides a resolver function for each API endpoint
    const root = { k: () => 'simpleValue' }

    // Run the GraphQL query '{ k }' and print out the response
    return graphql(schema, '{ k }', root).then((response) => {
      expect(response.data).toEqual({ k: 'simpleValue' })
    })
  })
})
