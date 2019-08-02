const directoryOrDefault = function (argv) {
  return argv.directory ? argv.directory : './'
}

module.exports = directoryOrDefault
