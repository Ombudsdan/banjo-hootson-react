export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never']
  }
};
