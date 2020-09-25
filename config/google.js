const config = {
   
    gClientID: '595083078627-83oem8uccq3pf42esuon0ttqpisj3s55.apps.googleusercontent.com',
    gClientSecret: 'DQWZKS_MbqXq45C1QThtOok0',
    gCb: 'http://localhost:3001/auth/google/callback',
    port: 3001,
    scopes: [
      'https://www.googleapis.com/auth/photoslibrary.readonly',
      'profile',
      'https://www.googleapis.com/auth/photoslibrary.sharing',
      'https://www.googleapis.com/auth/photoslibrary.appendonly'
    ],
    photosToLoad: 100,
    searchPageSize: 100,
    albumPageSize: 100,
    apiEndpoint: 'https://photoslibrary.googleapis.com'

}

module.exports = config;