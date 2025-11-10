const DEFAULT_PORT = '5173';

module.exports = env => {
  const PORT = Number(env.PORT || DEFAULT_PORT);

  return {
    API_URL: env.API_URL || 'http://localhost:3000',
    GOOGLE_ADSENSE_PUBLISHER_ID: env.GOOGLE_ADSENSE_PUBLISHER_ID || '',
    GOOGLE_ADSENSE_TEST_SLOT: env.GOOGLE_ADSENSE_TEST_SLOT || '',
    PORT
  };
};
