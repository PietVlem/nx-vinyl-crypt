export const environment = {
  production: false,
  auth0: {
    domain: 'dev-1moar0eefmcqieuq.us.auth0.com',
    clientId: 'qkbZsRcB8zwTp70SxLa6vzkZ4iayqfCv',
    authorizationParams: {
      audience: 'https://hello-world.example.com',
      redirect_uri: 'http://localhost:4200/callback',
    },
    errorPath: '/callback',
  },
  api: {
    serverUrl: 'http://localhost:3333',
  },
};
