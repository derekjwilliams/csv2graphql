import * as Papa from 'papaparse'
import { simplecsv } from '../example-inputs/simple.csv'
import { simpleTestOfTransform } from '../example-templates/simpleTransform'

function transformValue(value, key) {
  if (key === 'B') {
    return simpleTestOfTransform.transformTemplate.B.transform(value)
  }
  // console.log(JSON.stringify(simpleTestOfTransform.transformTemplate))
  return value
}

const parserConfiguration = {
  delimiter: '',	// auto-detect
  newline: '',	// auto-detect
  quoteChar: '"',
  escapeChar: '"',
  header: true,
  trimHeaders: false,
  dynamicTyping: true, // default false
  preview: 0,
  encoding: '',
  worker: false,
  comments: false,
  step: undefined,
  complete: undefined,
  error: undefined,
  download: false,
  skipEmptyLines: true, // default false
  chunk: undefined,
  fastMode: undefined,
  beforeFirstChunk: undefined,
  withCredentials: undefined,
  transform: transformValue// default undefined
}

describe('Parsing CSV', () => {
  test('parse simple csv one line numbers with no header', () => {
    const csv = '1,2'
    const parsed = Papa.parse(csv, { dynamicTyping: true })
    expect(parsed.data[0]).toEqual([1, 2])
  })
  test('parse simple csv one line with header', () => {
    const csv = '"C1","C2",\n1V1,1V2\n1,2'
    const parsed = Papa.parse(csv, parserConfiguration)
    const expected = '[{"C1":"1V1","C2":"1V2"},{"C1":1,"C2":2}]'
    expect(parsed.data[0]).toEqual({ C1: '1V1', C2: '1V2' })
    expect(parsed.data[1]).toEqual({ C1: 1, C2: 2 })
    expect(JSON.stringify(parsed.data)).toBe(expected)
  })
  test('with header csv parse', () => {
    const csv = simplecsv.data
    const parsed = Papa.parse(csv, parserConfiguration)
    const expected = '[{"A":"AValue1","B":"2018-06-11T06:00:00.000Z"},{"A":"AValue2","B":"2018-06-11T06:00:00.000Z"}]'
    expect(parsed.data[0].B instanceof Date).toBeTruthy()
    expect(parsed.data[1].B instanceof Date).toBeTruthy()
    // expect(JSON.stringify(parsed.data)).toEqual(expected)
  })
})
