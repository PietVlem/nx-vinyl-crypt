export const environment = {
  production: true,
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
    serverUrl: 'http://192.168.215.2:3000',
  },
};
