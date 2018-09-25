// import { TransformTemplate, Transformation} from '../lib/transformTemplate'
// import Transformer from '../lib/transformer'

import { graphql, buildSchema } from 'graphql'
import fetch from 'node-fetch'
import fs from 'fs'
import { introspectionQuery } from '../utility/introspectionQueries'

const defaultLocalTestURL = 'http://localhost:5000/graphql'
const testLocalFileOutput = './tests/outputs/localwithfilter.json'

const defaultRemoteTestURL = 'https://api.sciencebase.gov/nabatmonitoring-survey/graphql'//'http://localhost:5000/graphql'
const testRemoteFileOutput = './tests/outputs/nabatmonitoring.json'
// const testCleanFileOutput = './outputs/nabatmonitoringclean.json'

test('get schema', () => {
  introspectionQuery
  return fetch(defaultLocalTestURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: introspectionQuery })
  })
    .then(result => result.json())
    .catch(error => console.error('Error: ', error))
    .then((result) => {
      fs.writeFileSync('./schema.graphql', JSON.stringify(result.data, null, 2))
    })
    .catch(error => console.error('Error2: ', error))
})
describe('Load Schema From Local URL', () => {
  test('load schema with introspection', () => {
    return fetch(defaultLocalTestURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: introspectionQuery })
    })
      .then(result => result.json())
      .catch(error => console.error('Error: ', error))
      .then((result) => {
        fs.writeFileSync(testFileOutput, JSON.stringify(result.data, null, 2))
      })
      .catch(error => console.error('Error2: ', error))
  })
})

describe('Load Schema From Remote URL', () => {
  test('load schema with introspection from remote url', () => {
    return fetch(defaultRemoteTestURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: introspectionQuery })
    })
      .then(result => result.json())
      .catch(error => console.error('Error: ', error))
      .then((result) => {
        fs.writeFileSync(testRemoteFileOutput, JSON.stringify(result.data, null, 2))
      })
      .catch(error => console.error('Error2: ', error))
  })
})


test('filter schema field names', () => {
  let rawdata = fs.readFileSync('./tests/outputs/nabatmonitoring.json')
  let legacy = JSON.parse(rawdata)
  let filtered = JSON.parse(rawdata)
  let input = legacy.__schema.types[0].fields.map(f => f.name)

const expected = [ 'query',
      'nodeId',
      'node',
      'allClutterTypes',
      'allColonyCountEvents',
      'allColonyCountEventSites',
      'allColonyCountSiteValues',
      'allCountConfidences',
      'allCountMethods',
      'allDevices',
      'allDeviceTypes',
      'allEmergenceEvents',
      'allEmergenceEventValues',
      'allEmergenceImages',
      'allEnvironmentalData',
      'allEventConditions',
      'allGuanoAmounts',
      'allHabitatTypes',
      'allHowPdPresumeds',
      'allHowWnsPresumeds',
      'allImages',
      'allLaboratories',
      'allLoggerTypes',
      'allMicrophones',
      'allMicrophoneHousingTypes',
      'allMicrophoneOrientations',
      'allMicrophoneTypes',
      'allMobileAcousticEvents',
      'allMobileAcousticValues',
      'allMobileTransectAcousticValues',
      'allPresumedCauseDeaths',
      'allSampleLevelInformations',
      'allSampleTypes',
      'allSites',
      'allSiteAlternateNames',
      'allSiteLevels',
      'allSiteMaterials',
      'allSiteSections',
      'allSiteSizes',
      'allSiteTypes',
      'allSiteUses',
      'allSoftwares',
      'allSpecies',
      'allStationaryAcousticEvents',
      'allStationaryAcousticImages',
      'allStationaryAcousticValues',
      'allSurveys',
      'allTableparkBrs',
      'allXrefspeciesspeciesgroups',
      'clutterTypeById',
      'colonyCountEventById',
      'colonyCountEventSiteById',
      'colonyCountSiteValueById',
      'countConfidenceById',
      'countMethodById',
      'deviceById',
      'deviceTypeById',
      'emergenceEventById',
      'emergenceEventValueById',
      'emergenceImageById',
      'environmentalDatumById',
      'eventConditionById',
      'guanoAmountById',
      'habitatTypeById',
      'howPdPresumedById',
      'howWnsPresumedById',
      'imageById',
      'laboratoryById',
      'loggerTypeById',
      'microphoneById',
      'microphoneHousingTypeById',
      'microphoneOrientationById',
      'microphoneTypeById',
      'mobileAcousticEventById',
      'mobileAcousticValueById',
      'mobileTransectAcousticValueById',
      'presumedCauseDeathById',
      'sampleLevelInformationById',
      'sampleTypeById',
      'siteById',
      'siteAlternateNameById',
      'siteLevelById',
      'siteMaterialById',
      'siteSectionById',
      'siteSizeById',
      'siteTypeById',
      'siteUseById',
      'softwareById',
      'speciesById',
      'stationaryAcousticEventById',
      'stationaryAcousticImageById',
      'stationaryAcousticValueById',
      'surveyById',
      'geojsonMaeTransect',
      'geojsonMaeventLocation',
      'geojsonSaeventLoc',
      'geojsonSiteLocation',
      'clutterType',
      'colonyCountEvent',
      'colonyCountEventSite',
      'colonyCountSiteValue',
      'countConfidence',
      'countMethod',
      'device',
      'deviceType',
      'emergenceEvent',
      'emergenceEventValue',
      'emergenceImage',
      'environmentalDatum',
      'eventCondition',
      'guanoAmount',
      'habitatType',
      'howPdPresumed',
      'howWnsPresumed',
      'image',
      'laboratory',
      'loggerType',
      'microphone',
      'microphoneHousingType',
      'microphoneOrientation',
      'microphoneType',
      'mobileAcousticEvent',
      'mobileAcousticValue',
      'mobileTransectAcousticValue',
      'presumedCauseDeath',
      'sampleLevelInformation',
      'sampleType',
      'site',
      'siteAlternateName',
      'siteLevel',
      'siteMaterial',
      'siteSection',
      'siteSize',
      'siteType',
      'siteUse',
      'software',
      'species',
      'stationaryAcousticEvent',
      'stationaryAcousticImage',
      'stationaryAcousticValue',
      'survey']

  const filterStrings = ['allTbl', 'allTlu']
  let actual = input.filter(v => {
    return !filterStrings.some(e => {
    return v.startsWith(e)})
  })

  expect(actual).toEqual(expected)
})

test('filter mutations', () => {
  let rawdata = fs.readFileSync('./tests/outputs/nabatmonitoring.json')
  let legacy = JSON.parse(rawdata)
  let mutationIndex = -1
  let mutationRoots = legacy.__schema.types.filter((t, i) => {
    if (t.name === "Mutation") {
      mutationIndex = i
      console.log(`index of name "Mutation" in __schema.types: ${mutationIndex}`)
    }
    return t.name === "Mutation"
  })
  if (mutationRoots && mutationRoots.length > 1) {
    console.log(`Multiple(${mutationRoots.length}) Mutation Roots, will use the first one onle`)
  }
  if (mutationRoots && mutationRoots.length > 0 && mutationRoots[0].fields.length > 0) {
    const mutationRoot = mutationRoots[0]
    console.log(`mutationRoot: ${JSON.stringify(mutationRoot.fields.length)}`)
    mutationRoot.fields.forEach(field => {
      if (field != null) {
        console.log(`mutation name: ${field.name}`)
      }
    })
  }
})

test('filter schema fields', () => {
  const filterStrings = ['allTbl', 'allTlu', 'Tbl', 'Tlu', 'allTablepark', 'allXrefspeciesspeciesgroups', 'Xrefspeciesspeciesgroups']
  const mutations = ['Create', 'Update', 'Delete', 'create', 'update', 'delete', '']

  const mutationFilterStrings = mutations.reduce((a, m) => a.concat(filterStrings.map(f => m + f)),[])
  console.log(`mutationFilterStrings: ${JSON.stringify(mutationFilterStrings, null, 2)}`)
  let rawdata = fs.readFileSync('./tests/outputs/nabatmonitoring.json')
  let legacy = JSON.parse(rawdata)
  let filtered = JSON.parse(rawdata)

  // console.log(`__schema.types at: ${mutationIndex}: ${JSON.stringify(legacy.__schema.types[mutationIndex].fields, null, 2)}`)


  let mutationIndex = -1
  let mutationRoots = legacy.__schema.types.filter((t, i) => {
    if (t.name === "Mutation") {
      mutationIndex = i
      console.log(`index of name "Mutation" in __schema.types: ${mutationIndex}`)
    }
    return t.name === "Mutation"
  })
  // console.log(`__schema.types at: ${mutationIndex}: ${JSON.stringify(legacy.__schema.types[mutationIndex].fields, null, 2)}`)

  let mutationFields = legacy.__schema.types[mutationIndex].fields
  filtered.__schema.types[mutationIndex].fields = []
  // filteredMutations = mutationFields.filter()
  let filteredMutations = mutationFields.filter(v => {
    return !mutationFilterStrings.some(mutationFilterString => {
      return v.name.startsWith(mutationFilterString)
    })
  })

  let typesToKeep = filtered.__schema.types.filter(v => {
    return !mutationFilterStrings.some(filterString => {
      return v.name.startsWith(filterString)
    })
  })
  typesToKeep.push(filteredMutations)
  filtered.__schema.types = typesToKeep


  let input = filtered.__schema.types[0].fields

  const expectedQueries = [
      'query',
      'nodeId',
      'node',
      'allClutterTypes',
      'allColonyCountEvents',
      'allColonyCountEventSites',
      'allColonyCountSiteValues',
      'allCountConfidences',
      'allCountMethods',
      'allDevices',
      'allDeviceTypes',
      'allEmergenceEvents',
      'allEmergenceEventValues',
      'allEmergenceImages',
      'allEnvironmentalData',
      'allEventConditions',
      'allGuanoAmounts',
      'allHabitatTypes',
      'allHowPdPresumeds',
      'allHowWnsPresumeds',
      'allImages',
      'allLaboratories',
      'allLoggerTypes',
      'allMicrophones',
      'allMicrophoneHousingTypes',
      'allMicrophoneOrientations',
      'allMicrophoneTypes',
      'allMobileAcousticEvents',
      'allMobileAcousticValues',
      'allMobileTransectAcousticValues',
      'allPresumedCauseDeaths',
      'allSampleLevelInformations',
      'allSampleTypes',
      'allSites',
      'allSiteAlternateNames',
      'allSiteLevels',
      'allSiteMaterials',
      'allSiteSections',
      'allSiteSizes',
      'allSiteTypes',
      'allSiteUses',
      'allSoftwares',
      'allSpecies',
      'allStationaryAcousticEvents',
      'allStationaryAcousticImages',
      'allStationaryAcousticValues',
      'allSurveys',
      'clutterTypeById',
      'colonyCountEventById',
      'colonyCountEventSiteById',
      'colonyCountSiteValueById',
      'countConfidenceById',
      'countMethodById',
      'deviceById',
      'deviceTypeById',
      'emergenceEventById',
      'emergenceEventValueById',
      'emergenceImageById',
      'environmentalDatumById',
      'eventConditionById',
      'guanoAmountById',
      'habitatTypeById',
      'howPdPresumedById',
      'howWnsPresumedById',
      'imageById',
      'laboratoryById',
      'loggerTypeById',
      'microphoneById',
      'microphoneHousingTypeById',
      'microphoneOrientationById',
      'microphoneTypeById',
      'mobileAcousticEventById',
      'mobileAcousticValueById',
      'mobileTransectAcousticValueById',
      'presumedCauseDeathById',
      'sampleLevelInformationById',
      'sampleTypeById',
      'siteById',
      'siteAlternateNameById',
      'siteLevelById',
      'siteMaterialById',
      'siteSectionById',
      'siteSizeById',
      'siteTypeById',
      'siteUseById',
      'softwareById',
      'speciesById',
      'stationaryAcousticEventById',
      'stationaryAcousticImageById',
      'stationaryAcousticValueById',
      'surveyById',
      'geojsonMaeTransect',
      'geojsonMaeventLocation',
      'geojsonSaeventLoc',
      'geojsonSiteLocation',
      'clutterType',
      'colonyCountEvent',
      'colonyCountEventSite',
      'colonyCountSiteValue',
      'countConfidence',
      'countMethod',
      'device',
      'deviceType',
      'emergenceEvent',
      'emergenceEventValue',
      'emergenceImage',
      'environmentalDatum',
      'eventCondition',
      'guanoAmount',
      'habitatType',
      'howPdPresumed',
      'howWnsPresumed',
      'image',
      'laboratory',
      'loggerType',
      'microphone',
      'microphoneHousingType',
      'microphoneOrientation',
      'microphoneType',
      'mobileAcousticEvent',
      'mobileAcousticValue',
      'mobileTransectAcousticValue',
      'presumedCauseDeath',
      'sampleLevelInformation',
      'sampleType',
      'site',
      'siteAlternateName',
      'siteLevel',
      'siteMaterial',
      'siteSection',
      'siteSize',
      'siteType',
      'siteUse',
      'software',
      'species',
      'stationaryAcousticEvent',
      'stationaryAcousticImage',
      'stationaryAcousticValue',
      'survey']

  let filteredFields = input.filter(v => {
    return !filterStrings.some(filterString => {
      return v.name.startsWith(filterString)
    })
  })
  // //filtered.__schema.types[0].fields = filteredFields
  filtered.__schema.types[0].fields = filteredFields
  // const names = filteredFields.map(f => f.name)
  // console.log(JSON.stringify(names))
  fs.writeFileSync('./tests/outputs/filterednabatmonitoring.json', JSON.stringify(filtered, null, 2))
  let inputNames = filtered.__schema.types[0].fields.map(f => f.name)
  expect(inputNames).toEqual(expectedQueries)
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
