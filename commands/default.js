const { licenses } = require('liblice')
const alphasort = require('alpha-sort')
const { directoryOrDefault } = require('../helpers')
const output = require('../helpers/output')

exports.command = '$0 [directory]'

exports.describe = 'Check licenses in the current application or project, or a passed directory.'

// Builds out command flags and descriptions
exports.builder = function (yargs) {
  return yargs.usage('delice [command] [options]')
    .option('json', {
      alias: 'j',
      demandOpton: false,
      default: false,
      describe: 'Return JSON rather than a human-readable CLI output.',
      type: 'boolean'
    })
}

exports.handler = function (argv) {
  const directory = directoryOrDefault(argv)
  buildPrettyPrint(directory, argv)
}

function buildPrettyPrint (directory, argv) {
  const licensesFromDir = licenses(directory)

  for (const license in licensesFromDir) {
    const packages = Object.keys(licensesFromDir[license].packages).sort(alphasort.ascending)

    const rawJSON = {
      licenseExpression: license,
      occurrences: licensesFromDir[license].occurrences,
      conformance: licensesFromDir[license].conformance, // object that expands to all the things we want to expose
      packages: packages
    }

    if (argv.json === true) {
      console.log(JSON.stringify(rawJSON, null, 2))
    } else {
      console.log(output(rawJSON, license))
    }
  }
}
