import { graphql, buildSchema } from 'graphql'
import fetch from 'node-fetch'
import fs from 'fs'
import { introspectionQuery } from '../utility/introspectionQueries'
import { mutationsListingQuery } from '../utility/mutationsListingQuery'
import { Mutations } from '../src/mutations'
import gql from 'graphql-tag';
import 'cross-fetch/polyfill';
import ApolloClient from "apollo-boost"

const defaultTestURL = 'http://localhost:5000/graphql'


describe('gql tag', () => {
  const defaultOptions = {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all'
    }
  }

  // test('gql - simple', () => {
  //   const client = new ApolloClient({
  //     uri: "http://localhost:5000/graphql"
  //   })
  //   client
  // .query({
  //   query: gql`
  //     {
  //       rates(currency: "USD") {
  //         currency
  //       }
  //     }
  //   `
  // })
  // .then(result => console.log(result));
  //   const query = gql`
  //     mutation CreateSurvey($survey: CreateSurveyInput! ){
  //       createSurvey(input: $survey) {
  //         survey {
  //           id
  //         }
  //       }
  //     }
  //   `
  //   const expected = {abc:2}
  //   expect(query).toEqual(expected)
  // })
})

describe('Mutation Creation', () => {
  test('for a given type create the mutation by introspecting the schema', () => {
    return fetch(defaultTestURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: introspectionQuery })
    })
      .then(result => result.json())
      .catch(error => console.error('Error: ', error))
      .then((result) => {
        // fs.writeFileSync(testFileOutput, JSON.stringify(result.data, null, 2))
      })
      .catch(error => console.error('Error2: ', error))
  })

  test('load one mutation - name', () => {
    const expected = `createClutterType`
    Mutations.createMutationGQL()
    expect.assertions(1)
    let mutation = 'createClutterType'
    return fetch(defaultTestURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: mutationsListingQuery })
    })
      .then(result => result.json())
      .then((result) => {
        let clutterTypeMutation = Mutations.findMutation(mutation, result.data.__type.fields)

        expect(clutterTypeMutation.name).toEqual(mutation)
        console.log(JSON.stringify(clutterTypeMutation, null, 2))
      })
  })

  test('load one mutation', () => {
    const expected = `
    mutation create($ct: CreateClutterTypeInput! ){
      createClutterType(input: $ct) {
        clutterType {
          description
        }
      }
    }
    `


    expect.assertions(1)
    let mutation = 'createClutterType'
    return fetch(defaultTestURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: mutationsListingQuery })
    })
      .then(result => result.json())
      .then((result) => {
        let clutterTypeMutation = Mutations.findMutation(mutation, result.data.__type.fields)
        const expected =  {"args": [{"name": "input", "type": {"ofType": {"inputFields": [{"description": "An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client.", "name": "clientMutationId", "type": {"ofType": null}}, {"description": "The `ClutterType` to be created by this mutation.", "name": "clutterType", "type": {"ofType": {"description": "An input for mutations affecting `ClutterType`", "name": "ClutterTypeInput"}}}], "kind": "INPUT_OBJECT", "name": "CreateClutterTypeInput"}}}], "description": "Creates a single `ClutterType`.", "name": "createClutterType", "type": {"kind": "OBJECT", "name": "CreateClutterTypePayload"}}
        expect(clutterTypeMutation).toEqual(expected)
        console.log(JSON.stringify(clutterTypeMutation, null, 2))
      })
  })

})
