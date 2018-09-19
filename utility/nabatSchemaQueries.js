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
const typeBody =
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
let objv = {}
export const nabatTypeQueries = nabatTypes.reduce((acc, val) =>  {
  let result = `{__type (name: "${val}") ${typeBody} }`
  acc[val] = result;
  return acc
}, {})
// export const nabatTypeQueries = queries
