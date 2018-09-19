import { TransformTemplate, Transformation } from '../lib/transformTemplate'
import { Transformer } from '../lib/transformer'
import { indentityTransform, ymdToISODateTransform, unusualDateTransform } from '../utility/transforms'
import { nabatTypeQueries } from '../utility/nabatSchemaQueries'

console.log(nabatTypeQueries)
test('simple create from object', () => {
  const testInput = 'a,b,c\n1,2,3'
  const transformer = Transformer.fromSpecification({ b: 3 })
  const graphQL = transformer.transform(testInput)
//  console.log(JSON.stringify(transformer))
  expect(JSON.stringify(transformer)).toBe(JSON.stringify({ b: 3 }))
})

test('simple TransformTemplate constructor', () => {
  const actual = new TransformTemplate().columnTransforms
  expect(actual).toEqual([])
})

describe('Constructors', () => {
  test('simple Transformation constructor', () => {
    const actual = new Transformation().columnTransforms
    expect(actual).toEqual(undefined)
  })
  test('Transformation construction', () => {
    const transform = new Transformation({ sourceKey: 'a', targetKey: 'agql', type: 'date', format: ymdToISODateTransform })
    expect(JSON.stringify(transform)).toBe(JSON.stringify({ sourceKey: 'a', targetKey: 'agql', type: 'date' }))
  })
})

describe('Add Transformations', () => {
  test('add Transformation', () => {
    const actual = new TransformTemplate()
    actual.addTransform(new Transformation())
    const expected = '[{"sourceKey":"csv_column","targetKey":"gcq_key"}]'
    expect(JSON.stringify(actual.columnTransforms)).toEqual(expected)
  })

  test('add Multiple Transformations', () => {
    const actual = new TransformTemplate()
    const expected = '[{"sourceKey":"csv_column","targetKey":"gcq_key"},{"sourceKey":"csv_column","targetKey":"gcq_key"}]'
    actual.addTransform(new Transformation())
    actual.addTransform(new Transformation())
    expect(JSON.stringify(actual.columnTransforms)).toEqual(expected)
  })
})


// test('Transformation indentityTransform', () => {
//   let input = {}
//   let actual = new Transformation({ format: indentityTransform })
//   actual.transform()
//   // expect(actual).toBe(`aa`)
// })

test('Transformation combine year month day', () => {
  const input = { year: 2018, month: 1, day: 2 }
  const actual = new Transformation({ format: ymdToISODateTransform }).format(input)
  expect(actual).toBe(`${input.year}-${input.month}-${input.day}`)
})

test('Transformation colony count date string', () => {
  const input = '7-jun-18'
  const actual = new Transformation({ format: unusualDateTransform }).format(input)
  expect(actual.toISOString()).toBe('2018-06-07T06:00:00.000Z')
})

test('Transformation date expression, first day of next month', () => {
  const thisMonth = new Date().getMonth()
  const nextMonth = thisMonth !== 11 ? thisMonth + 1 : 0
  const nextMonthsYear = thisMonth !== 11 ? new Date().getFullYear() : new Date().getFullYear() + 1
  const input = 'first day of next month'
  const expected = new Date(nextMonthsYear, nextMonth, 1).toISOString()
  const actual = new Transformation({ format: unusualDateTransform }).format(input)
  expect(actual.toISOString()).toEqual(expected)
})
