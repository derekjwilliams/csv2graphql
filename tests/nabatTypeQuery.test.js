import fetch from 'node-fetch'
import { nabatTypeQueries } from '../utility/nabatSchemaQueries'
import { mutationsListingQuery } from '../utility/mutationsListingQuery'

const defaultTestURL = 'http://localhost:5000/graphql'

describe('Load List of Mutations', () => {
  test('load all schemas', () => {
    fetch(defaultTestURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: mutationsListingQuery })
    })
      .then(result => result.json())
      .then((result) => {
        // console.log(JSON.stringify(result.data, null, 2))
      })
  })
})

describe('Load Schema From URL', () => {
  test('load all schemas', () => {
    Object.entries(nabatTypeQueries).forEach(([k, v]) => {
      // console.log(`${k} : ${v}`)
      fetch(defaultTestURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: v })
      })
        .then(result => result.json())
        .then((result) => {
          // console.log(JSON.stringify(result.data, null, 2))
        })
    })
  })
  test('load one schema', () => {
    fetch(defaultTestURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: nabatTypeQueries.SurveyInput })
    })
      .then(result => result.json())
      .then((result) => {
        // console.log(JSON.stringify(result.data, null, 2))
      })
  })
})
