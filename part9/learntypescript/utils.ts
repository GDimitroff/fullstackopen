const parseArguments = (args: Array<string>): Array<number> => {
  return args.map((arg) => {
    const number = Number(arg)

    if (isNaN(number)) {
      throw new Error(`Could not parse argument "${arg}" to a number.`)
    }

    return number
  })
}

export { parseArguments }
