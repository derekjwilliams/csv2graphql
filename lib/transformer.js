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
