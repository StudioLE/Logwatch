module.exports = (output) => {
  if(Array.isArray(output)) {
    output = output.join('\n')
  }
  console.log(output)
}
