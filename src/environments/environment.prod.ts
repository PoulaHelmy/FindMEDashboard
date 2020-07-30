export const environment = {
  production: true,
  apiRoot: 'http://findme.test/api',
  algolia: {
    appId: 'VNP1XYFNSF',
    apiKey: '43313045a7a3e98b65b0cb53cdc3cfcc',
    indexName: 'getstarted_actors',
    urlSync: false,
  },
  // pusher-angular-realtime-feed/server/variable.env
  pusher: {
    PUSHER_APP_ID: '1007567',
    PUSHER_APP_KEY: '30cfc6c3e71955413265',
    PUSHER_APP_SECRET: '9a040b29b43c4cbd234a',
    PUSHER_APP_CLUSTER: 'mt1',
    PUSHER_APP_SECURE: 1,
    channel: 'ng-chat',
    server: 'http://findme.test/api',
  },
  //Firebase Config Variables
  firebaseConfig: {
    apiKey: 'AIzaSyDa6fMm2z-MF5-Rb1rI--v_jYnJh1N_msQ',
    authDomain: 'findme-frontend.firebaseapp.com',
    databaseURL: 'https://findme-frontend.firebaseio.com',
    projectId: 'findme-frontend',
    storageBucket: 'findme-frontend.appspot.com',
    messagingSenderId: '127883493366',
    appId: '1:127883493366:web:f8905a57d6b74216ec91d7',
    measurementId: 'G-RPGCK49QK1',
  },
  azure: {
    endpoint: 'https://eastus.api.cognitive.microsoft.com/face/v1.0',
  },
};
