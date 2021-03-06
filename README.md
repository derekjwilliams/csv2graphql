# Phirise

## Description

Convert a related set of CSV inputs to GraphQL mutations and Query Variables that can be used to send data to a GraphQL service.  The inverse, reading from graphQL service to set of CSV outputs is a future goal.  No user interface provided, see related projects for React 16+ and Angular 6+ user interface components.  Simple examples are provided in a separate repository for React and Angular using Apollo Client.

## Map Specification - Transform Template

Specifies The Mapping from input values in multiple CSV inputs to values in a graphql service.

## Postgraphile First

Initial implementation uses the schema generated by [Postgraphile](https://www.graphile.org/postgraphile/"Instant GraphQL API for PostgreSQL database").  

Additional implementations can be added by the user.

## Using Introspection to Make Life Easier

Example Queries:

### Get Type Information for a Specific Type

```
{
  __type(name: "StationaryAcousticValue") {
    kind
    name
    description
    fields {
      name
      description
      type {
        kind
        name
      }
      args {
        name
        description
      }
    }
  }
}
```


### Get a Schema

```
 {__schema {
   queryType {
     name
   }
}}
```

### Getting A  List Mutations with Input Names with types, and Return Types

```{
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
}
```

### A Single Element in the Result From the Above Introspection

```{
  "name": "createSite",
  "description": "Creates a single `Site`.",
  "type": {
    "kind": "OBJECT",
    "name": "CreateSitePayload"
  },
  "args": [
    {
      "name": "input",
      "type": {
        "ofType": {
          "kind": "INPUT_OBJECT",
          "name": "CreateSiteInput",
          "inputFields": [
            {
              "name": "clientMutationId",
              "description": "An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client.",
              "type": {
                "ofType": null
              }
            },
            {
              "name": "site",
              "description": "The `Site` to be created by this mutation.",
              "type": {
                "ofType": {
                  "name": "SiteInput",
                  "description": "An input for mutations affecting `Site`"
                }
              }
            }
          ]
        }
      }
    }
  ]
}
```

## Creating and Updating Values

### Create Value

#### Survey

```
mutation CreateSurvey($survey: CreateSurveyInput! ){
  createSurvey(input: $survey) {
    survey {
      id
    }
  }
}
```

Query Param:

```
{
  "survey": {
    "survey": {
      "projectId": -1,
      "startDate": "2017-06-28",
      "grtsId": 18
    }
  }
}
```

#### AcousticEvent



#### ClutterType

```
mutation CreateClutterType($ct: CreateClutterTypeInput! ){
  createClutterType(input: $ct) {
    clutterType {
      description
    }
  }
}
```

Query Param:

```
{
  "ct": {
    "clutterType": {
      "description": "Building"
    }
  }
}
```



### Update Value

#### ClutterType

```
  mutation UpdateClutterTypeDescription($ctd: UpdateClutterTypeInput!) {
  updateClutterType(input: $ctd) {
    clutterType {
      description
    }
  }
}
```

Query Param:

```
{
  "ctd": {
    "id": "WyJjbHV0dGVyX3R5cGVzIiwxXQ==",
    "clutterTypePatch": {
      "description": "Water"
    }

  }
}
```
