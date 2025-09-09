const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

jasmine.getEnv().addReporter(new SpecReporter({
  spec: {
    displayStacktrace: 'raw',
    displaySuccessfulSpec: true,
    displaySpecDuration: true,
    displayPendingSpec: true
  },
  summary: {
    displayDuration: true,
    displayErrorMessages: true,
    displayFailedSpec: true,
    displaySpecDuration: true,
    displayStacktrace: true
  }
}));
