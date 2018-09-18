class ColumnTransformation {
  constructor() {
    this.sourceKey
    this.targetKey
    this.type // optional e.g. datetime, date,
    this.filter // e.g. function to apply, e.g. (){x * 3}
  }
}

/* For a given input source (CSV) the template maps from each
column in the input to one or more ouput destinations.  The destinations
are a description of the GraphQL mutation create functions.
The destinationColumnTransforms are the mapping from the input
*/

export default class TransformTemplate {
  constructor() {
    this. destinationColumnTransforms = new Array()
    // this.input //CSV strings with header column
    // this.destinationColumnTransforms
  }
}
