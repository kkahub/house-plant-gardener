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

// 식물도감 리스트 서버 호출
exports.guide = functions.region(region).https.onRequest((req, response) => {
  cors(req, response, () => {
    if (
      req.get('origin') ===
        'https://asia-northeast3-house-plant-gardener.cloudfunctions.net/guide' ||
      req.get('origin') === 'http://localhost:5173'
    ) {
      const baseApiUrl = `http://openapi.nature.go.kr/openapi/service/rest/PlantService/plntIlstrSearch?serviceKey=${process.env.GUIDE_APIKEY}`
      const queryParams = Object.entries(req.query)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&')
      const apiUrl = `${baseApiUrl}&${queryParams}`

      request(
        {
          url: apiUrl
        },
        function (error, res, body) {
          if (error) {
            response.status(500).send({ error: '500에러 발생', details: error })
          } else {
            response.send(body)
          }
        }
      )
    } else {
      response.status(403).send('Forbidden')
    }
  })
})

// 실내정원용 식물 리스트 서버 호출
exports.indoor = functions.region(region).https.onRequest((req, response) => {
  cors(req, response, () => {
    if (
      req.get('origin') ===
        'https://asia-northeast3-house-plant-gardener.cloudfunctions.net/indoor' ||
      req.get('origin') === 'http://localhost:5173'
    ) {
      const baseApiUrl = `http://api.nongsaro.go.kr/service/garden/gardenList?apiKey=${process.env.INDOOR_APIKEY}`
      const queryParams = Object.entries(req.query).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&')
      const apiUrl = `${baseApiUrl}&${queryParams}`
      
      request(
        { url: apiUrl },
        function (error, res, body) {
          if (error) {
            response.status(500).send({ error: '500에러 발생', details: error })
          } else {
            response.send(body)
          }
        }
      )
    } else {
      response.status(403).send('Forbidden')
    }
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
