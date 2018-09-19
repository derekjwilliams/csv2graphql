
const nabatTypes = ['SurveyInput', 'SiteInput', 'StationaryAcousticEventInput', 'MobileAcousticEventInput']
const typeBody = `{
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

export const nabatTypeQueries = nabatTypes.map(t =>  `{__type (name: "${t}") ${typeBody} }`)
