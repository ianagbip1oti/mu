'use strict';

// const { Signale } = require('signale');
import { Signale } from 'signale';

const log = new Signale({
  types: {
    error: {
      stream: process.stderr
    },
    fatal: {
      stream: process.stderr
    }
  }
});

log.config({
  displayDate: true,
  displayTimestamp: true,
  displayFilename: true
});

module.exports = log;