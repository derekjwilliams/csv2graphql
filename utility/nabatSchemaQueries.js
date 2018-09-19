const stripIndent = require('common-tags/lib/stripIndent')

//TODO get these from the introspection looking for INPUT_OBJECTs that end with "Input" and don't start with "Create" or "Patch"
const nabatTypes =  [
                     'ClutterTypeInput',
                     'ColonyCountEventInput',
                     'CountConfidenceInput',
                     'CountMethodInput',
                     'DeviceInput',
                     'DeviceTypeInput',
                     'EnvironmentalDatumInput',
                     'HabitatTypeInput',
                     'HowPdPresumedInput',
                     'HowWnsPresumedInput',
                     'LaboratoryInput',
                     'LoggerTypeInput',
                     'MicrophoneTypeInput',
                     'MicrophoneOrientationInput',
                     'MicrophoneHousingTypeInput',
                     'MobileAcousticEventInput',
                     'MobileAcousticValueInput',
                     'SiteInput',
                     'SiteLevelInput',
                     'SiteTypeInput',
                     'SiteUseInput',
                     'SoftwareInput',
                     'SpeciesInput',
                     'StationaryAcousticEventInput',
                     'StationaryAcousticImageInput',
                     'StationaryAcousticValueInput',
                     'SiteMaterialInput',
                     'SiteSizeInput',
                     'SiteInput',
                     'StationaryAcousticEventInput',
                     'StationaryAcousticImageInput',
                     'SurveyInput',
]
const typeBody = stripIndent
`{
  name
  description
  inputFields {
    description
    defaultValue
    name
    type {
      name
      description
      kind
      ofType {
        name
        description
      }
    }
  }
}`

export const nabatTypeQueries = nabatTypes.map(t =>  {
  let result = {}
  result[t] = `{__type (name: "${t}") ${typeBody} }`
  return result
})
