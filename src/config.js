const API_CONFIG = {
  PROD: {
    API_BASE_URL: "https://backend.epns.io/apis",
    APP_LINK: "https://app.push.org/",
    APP_ENV: "prod"
  },
  STAGING: {
    API_BASE_URL: "https://backend-staging.epns.io/apis",
    APP_LINK: "https://staging.push.org/",
    APP_ENV: "staging"
  }
}

const CONFIG = {
  1: API_CONFIG.PROD,
  137: API_CONFIG.PROD,
  5: API_CONFIG.STAGING,
  80001: API_CONFIG.STAGING,
};

export default CONFIG;