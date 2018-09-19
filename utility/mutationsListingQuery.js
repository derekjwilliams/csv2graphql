export const mutationsListingQuery = `{
  __type(name: "Mutation") {
    fields {
      name
      description
      type {
        kind
        name
      }
      args {
        name
        type {
          ofType {
            kind
            name
            inputFields {
              name
              description
              type {
                ofType {
                  name
                  description
                }
              }
            }
          }
        }
      }
    }
  }
}`
