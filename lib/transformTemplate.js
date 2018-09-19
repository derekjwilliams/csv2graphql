import { identityTransform } from '../utility/transforms'

class Transformation {
  constructor({sourceKey = 'csv_column', targetKey = 'gcq_key', type, format} = {}) {
    console.log(`-----------`)
    this.sourceKey = sourceKey
    this.targetKey = targetKey
    this.type = type// optional e.g. datetime, date,
    this.format = format || identityTransform// e.g. function to apply to format the object(s), e.g. (){x * 3}
  }
  // converts
  format(input) {
    return this.format(input)
  }
}
/* For a given input source (CSV) the template maps from each
column in the input to one or more ouput destinations.  The destinations
are a description of the GraphQL mutation create functions.
The destinationColumnTransforms are the mapping from the input
*/

class TransformTemplate {
  constructor() {
    this. destinationColumnTransforms = new Array()
    // this.input //CSV strings with header column
    // this.destinationColumnTransforms
  }
  addTransform(transform) {
    this.destinationColumnTransforms.push(transform)
  }

  get columnTransforms() {
    return this.destinationColumnTransforms
  }

  set columnTransforms(transforms) {
    this.destinationColumnTransforms = transforms
  }
}

export {
  TransformTemplate,
  Transformation
}
