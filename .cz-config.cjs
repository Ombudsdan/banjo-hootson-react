module.exports = {
  types: [
    { value: 'feat', name: 'New feature' },
    { value: 'fix', name: 'Bug fix' },
    { value: 'chore', name: 'Maintenance tasks' },
    { value: 'docs', name: 'Documentation changes' },
    { value: 'style', name: 'Code style changes (formatting, missing semi-colons, etc)' },
    { value: 'refactor', name: 'Code refactoring without feature or bug change' },
    { value: 'perf', name: 'Performance improvements' },
    { value: 'test', name: 'Add or update tests' },
    { value: 'build', name: 'Build system / dependencies' }
  ],

  messages: {
    type: '[required] What type of change are you committing?',
    customScope: '[optional] List any COMPONENTS/MODULES affected by this change (press enter to skip):',
    subject: '[required] Provide a short summary of the change:',
    body: '[optional] Provide a longer description of the change (press enter to skip):',
    footer: '[optional] List any ISSUES CLOSED by this change. e.g.: #31, #34 (press enter to skip):'
  },

  scopes: []
};
