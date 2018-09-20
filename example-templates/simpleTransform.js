import { indentityTransform, ymdToISODateTransform, unusualDateTransform } from '../utility/transforms'

function parseAnyDate(input) {
  return input
}

export const simpleTestOfTransform = {
  transformTemplate:
    {
      'A' : {targetKey: 'graphQLKeyA' },
      'B' : {targetKey: 'graphQLKeyB', transform: ((input) => {return unusualDateTransform(input)}) }
    }
}
