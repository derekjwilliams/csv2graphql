class Mutations {
  constructor() {
  }

  static findMutation(mutation, allMutations) {
    let result = undefined
    if (allMutations != null) {
      const found = allMutations.filter(m => m.name === mutation)
      if (found != null && found.length === 1) {
        result = found[0]
      }
    }
    return result
  }

  static createMutationGQL(mutationDescription) {
    return gql`abc`
  }

  transform(input) {
    let result = {}
  }
}

export {
  Mutations
}