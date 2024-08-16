/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require('firebase-functions')

const {
  onDocumentCreated,
  onDocumentDeleted,
  onDocumentUpdated
} = require('firebase-functions/v2/https')

const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore, FieldValue, Timestamp } = require('firebase-admin/firestore')
const serviceAccount = require('./serviceAccountKey.json')
const cors = require('cors')({ origin: true })
const request = require('request')

const { logger } = functions

const app = initializeApp({
  credential: cert(serviceAccount)
})
const db = getFirestore(app)
const region = 'asia-northeast3'

const listParams = {
  // apiKey: import.meta.env.VITE_INDOOR_PLANT_API_KEY,
  pageNo: 1,
  numOfRows: 16
}

exports.apicall = functions.https.onRequest((req, response) => {
  cors(req, response, () => {
    // if (
    //   req.get('origin') === 'https://us-central1-house-plant-gardener.cloudfunctions.net/apicall' ||
    //   req.get('origin') === 'http://localhost:5000'
    // ) {
    request(
      {
        url:
          `http://api.nongsaro.go.kr/service/garden` +
          `/gardenList?apiKey=20240308LQZJEZGH2S9BGFDHKFOMA` +
          `&pageNo=${listParams.pageNo}` +
          `&sType=sCntntsSj&wordType=cntntsSj`,
        headers: {
          method: 'POST',
          credentials: 'include'
        }
      },
      function (error, res, body) {
        response.send(res)
      }
    )
    // }
  })
})

// exports.onCreateLike = onDocumentCreated(
//   {
//     region,
//     document: 'plant_like/{id}'
//   },
//   (event) => {
//     const snapshot = event.data
//     const data = snapshot.data()
//     logger.log('data: ', data)
//     db.doc(`guide/${data.plantCode}`).update({
//       likeCount: FieldValue.increment(1)
//     })
//   }
// )
