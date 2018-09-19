import fetch from 'node-fetch'
import { nabatTypeQueries } from '../utility/nabatSchemaQueries'


test('simple create from object', () => {
  console.log(JSON.stringify(nabatTypeQueries.SurveyInput))
  // expect(2).toBe(3)
})


const defaultTestURL = 'http://localhost:5000/graphql'
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
          console.log(JSON.stringify(result.data, null, 2))
        })
    })
  })
  test('load schema', () => {
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
