const archy = require('archy')
const chalk = require('chalk')

function output (rawJSON, license) {
  if (!rawJSON.conformance.error) {
    const successOutput = archy({
      label: `License Expression: ${chalk.green(rawJSON.licenseExpression)}`,
      nodes: [
        `There are ${chalk.yellow(rawJSON.occurances)} occurances of ${chalk.green(license)}.`,
        {
          label: `Conformance:`,
          nodes: [
            `Is OSI Approved: ${chalk.yellow(rawJSON.conformance.spdx.osi)}`,
            `Is FSF Free/Libre: ${chalk.yellow(rawJSON.conformance.spdx.fsf)}`,
            `Includes deprecated IDs: ${chalk.yellow(rawJSON.conformance.spdx.includesDeprecated)}`
          ]
        },
        {
          label: `Packages:`,
          nodes: rawJSON.packages
        }
      ]
    })

    return successOutput
  } else {
    const errorOutput = archy({
      label: `License Expression: ${chalk.red(rawJSON.licenseExpression)}`,
      nodes: [
        `There are ${chalk.yellow(rawJSON.occurances)} occurances of ${chalk.red(license)}.`,
        {
          label: `Conformance:`,
          nodes: [
            `Error: ${chalk.red(rawJSON.conformance.error)}`
          ]
        },
        {
          label: `Packages:`,
          nodes: rawJSON.packages
        }
      ]
    })

    return errorOutput
  }
}

module.exports = output
