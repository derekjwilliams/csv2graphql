// var template = require('./transformTemplate')
// let TransformTemplate = template.TransformTemplate

import TransformTemplate from './transformTemplate'

console.log(TransformTemplate)
let tt = new TransformTemplate()

class Transformer {
  constructor() {
    this.template = { a: 2 }
  }

  static fromSpecification(vo = undefined) {
    const newTemplate = vo || {}
    newTemplate.__proto__ = Transformer.prototype
    return newTemplate
  }

  // given a csvn input, create mutation and query variables
  transform(input) {
    console.log(JSON.stringify(this.tempate))
    console.log('transform')
    console.log(input)
  }
}

const testInput = 'a,b,c\n1,2,3'
const transformer = Transformer.fromSpecification({ b: 3 })
const graphQL = transformer.transform(testInput)
console.log(JSON.stringify(transformer))
