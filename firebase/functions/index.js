/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require('firebase-functions/v1')

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
exports.guideList = functions.region(region).https.onRequest((req, response) => {
  cors(req, response, () => {
    const baseApiUrl = `https://apis.data.go.kr/1400119/PlantResource/plantPilbkSearch?serviceKey=${process.env.GUIDE_APIKEY}`
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
  })
})

// 식물도감 상세페이지 서버 호출
exports.guideDetail = functions.region(region).https.onRequest((req, response) => {
  cors(req, response, () => {
    const baseApiUrl = `https://apis.data.go.kr/1400119/PlantResource/plantPilbkInfo?serviceKey=${process.env.GUIDE_APIKEY}`
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
  })
})

// 실내정원용 식물 리스트 서버 호출
exports.indoorList = functions.region(region).https.onRequest((req, response) => {
  cors(req, response, () => {
    const baseApiUrl = `http://api.nongsaro.go.kr/service/garden/gardenList?apiKey=${process.env.INDOOR_APIKEY}`
    const queryParams = Object.entries(req.query)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&')
    const apiUrl = `${baseApiUrl}&${queryParams}`

    request({ url: apiUrl }, function (error, res, body) {
      if (error) {
        response.status(500).send({ error: '500에러 발생', details: error })
      } else {
        response.send(body)
      }
    })
  })
})

// 실내정원용 상세페이지 서버 호출
exports.indoorDetail = functions.region(region).https.onRequest((req, response) => {
  cors(req, response, () => {
    const baseApiUrl = `http://api.nongsaro.go.kr/service/garden/gardenDtl?apiKey=${process.env.INDOOR_APIKEY}`
    const queryParams = Object.entries(req.query)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&')
    const apiUrl = `${baseApiUrl}&${queryParams}`

    request({ url: apiUrl }, function (error, res, body) {
      if (error) {
        response.status(500).send({ error: '500에러 발생', details: error })
      } else {
        response.send(body)
      }
    })
  })
})

// 식물도감 Trefle 이미지 호출
exports.trefleImg = functions.region(region).https.onRequest((req, response) => {
  cors(req, response, () => {
    const proxyPathDelete = req.path.replace('/service/guideImg/', '')
    const baseApiUrl = `https://trefle.io/api/v1/plants/${proxyPathDelete}`
    const queryParams = Object.entries(req.query)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&')
    const token = process.env.TREFLE_TOKEN
    const apiUrl = `${baseApiUrl}?token=${token}&${queryParams}`

    request(
      {
        url: apiUrl
      },
      function (error, res, body) {
        if (error) {
          logger.error('Trefle API request error:', error)
          response.status(500).send({ error: 'Error calling Trefle API', details: error })
        } else {
          // 429 등 오류 응답이 CDN에 캐시되지 않도록 성공일 때만 캐시
          if (res.statusCode === 200) {
            response.set('Cache-Control', 'public, max-age=86400, s-maxage=604800')
          }
          response.status(res.statusCode).send(body)
        }
      }
    )
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
