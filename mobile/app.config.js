import 'dotenv/config';

export default {
  "expo": {
    "name": "iqbike",
    "slug": "iqbike",
    "description": "Projekt - IQBike",
    "primaryColor": "#447352",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "cover",
      "backgroundColor": "#447352"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "plugins": [
      [
        "@stripe/stripe-react-native",
        {
          "publishableKey": "pk_test_51NYFlzIKI4pDhLQalxLqrYR3ddwtlT953xhR9zU95hZTPbc433BZjyBlmP8ijzxUaNLGB9uQoXXkj9wio0I3JIo10002MtkGmU",
          "enableGooglePay": false
        }
      ]
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#447352"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      predictionApi:  process.env.PREDICTION_API_KEY,
      predictionUrl: process.env.PREDICTION_URL,
      graphqlUrl: process.env.GRAPHQL_URL,
      stripeApiKey: process.env.STRIPE_API_KEY,
      stripeApiSecretKey: process.env.STRIPE_API_SECRET_KEY,
      mojUrl: process.env.MOJ_URL,
      googleApi: process.env.GOOGLE_API
    }
  }
}