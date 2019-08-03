const archy = require('archy')
const chalk = require('chalk')


function output(rawJSON, license) {
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
    let errorMessage = `Error: ${chalk.red(rawJSON.conformance.error)}`;
    let errorChalk = chalk.red;

    if (rawJSON.licenseExpression === 'UNLICENSED') {
      errorMessage = `Warning: ${chalk.red('The right to use a private or unpublished package has not been granted.')}`
    }

    if (rawJSON.licenseExpression === 'invalid license') {
      errorMessage = `Warning: ${chalk.red('License declaration is missing or incorrectly formatted.')}`
    }

    if (rawJSON.licenseExpression.includes('SEE LICENSE IN')) {
      errorChalk = chalk.cyan;
      errorMessage = `Info: ${chalk.cyan('A custom license, or one which hasn’t been assigned an SPDX identifier, is in use.')}`
    }

    const errorOutput = archy({
      label: `License Expression: ${errorChalk(rawJSON.licenseExpression)}`,
      nodes: [
        `There are ${chalk.yellow(rawJSON.occurances)} occurances of ${errorChalk(license)}.`,
        {
          label: `Conformance:`,
          nodes: [
            `${errorMessage}`
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
