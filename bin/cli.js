#!/usr/bin/env node

const yargs = require('yargs')

yargs.scriptName('delice')
  .usage('delice [command] [options]')
  .commandDir('../commands')
  .help('h')
  .alias('h', 'help')
  .argv
