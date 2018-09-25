
class Transformer {
  constructor(template) {
    this.template = template || {}
  }

  static fromSpecification(vo = undefined) {
    const newTemplate = vo || {}
    newTemplate.__proto__ = Transformer.prototype // TODO __proto__ is deprecated
    return newTemplate
  }
  /* input is a CSV with a header */
  transform(input) {
    let result = {}
  }
}

export {
  Transformer
}
