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
      .filter(([key]) => key !== 'v')
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&')
    const apiUrl = `${baseApiUrl}&${queryParams}`

    request(
      {
        url: apiUrl,
        timeout: 15000
      },
      function (error, res, body) {
        if (error) {
          response.status(500).send({ error: '500에러 발생', details: error })
        } else {
          if (
            res.statusCode === 200 &&
            body.includes('<resultCode>00</resultCode>') &&
            body.includes('<item>')
          ) {
            response.set('Cache-Control', 'public, max-age=86400, s-maxage=604800')
          }
          response.status(res.statusCode).send(body)
        }
      }
    )
  })
})

// 식물도감 iNaturalist 이미지 호출
exports.inaturalistImg = functions.region(region).https.onRequest((req, response) => {
  cors(req, response, () => {
    const name = req.query.name

    if (typeof name !== 'string' || name === '') {
      response.status(400).send({ error: 'name 파라미터가 필요합니다' })
      return
    }

    const apiUrl = `https://api.inaturalist.org/v1/taxa?q=${encodeURIComponent(name)}&per_page=5`

    request(
      {
        url: apiUrl,
        headers: { 'User-Agent': 'house-plant-gardener' }
      },
      function (error, res, body) {
        if (error) {
          logger.error('iNaturalist API request error:', error)
          response.status(500).send({ error: 'Error calling iNaturalist API', details: error })
        } else if (res.statusCode !== 200) {
          // 429 등 오류 응답은 CDN에 캐시되지 않도록 상태 코드만 전달
          response.status(res.statusCode).send(body)
        } else {
          const results = JSON.parse(body).results ?? []

          // 라이선스가 없는 사진 제외
          const matchedData = results.find(
            (item) =>
              (item.name === name || item.matched_term === name) && item.default_photo?.license_code
          )
          const photo = matchedData?.default_photo

          response.set('Cache-Control', 'public, max-age=86400, s-maxage=604800')
          response.json(
            photo
              ? {
                  id: photo.id,
                  licenseCode: photo.license_code,
                  mediumUrl: photo.medium_url,
                  attribution: photo.attribution
                }
              : null
          )
        }
      }
    )
  })
})

// 식물도감 iNaturalist 관찰 수 호출
exports.inaturalistObs = functions.region(region).https.onRequest((req, response) => {
  cors(req, response, async () => {
    const name = req.query.name

    if (typeof name !== 'string' || name === '') {
      response.status(400).send({ error: 'name 파라미터가 필요합니다' })
      return
    }

    const getJson = async (path) => {
      const res = await fetch(`https://api.inaturalist.org/v1/${path}`, {
        headers: { 'User-Agent': 'house-plant-gardener' }
      })
      if (!res.ok) throw new Error(`iNaturalist ${res.status}`)
      return res.json()
    }

    try {
      const { results = [] } = await getJson(`taxa?q=${encodeURIComponent(name)}&per_page=5`)
      const taxon = results.find((item) => item.name === name || item.matched_term === name)

      response.set('Cache-Control', 'public, max-age=86400, s-maxage=604800')

      if (!taxon) {
        response.json(null)
        return
      }

      // 6891: 대한민국
      const [kr, histogram] = await Promise.all([
        getJson(`observations?taxon_id=${taxon.id}&place_id=6891&per_page=0`),
        getJson(
          `observations/histogram?taxon_id=${taxon.id}&interval=month_of_year&date_field=observed`
        )
      ])
      const months = histogram.results?.month_of_year ?? {}
      const observationsByMonth = Array.from({ length: 12 }, (_, i) => months[i + 1] ?? 0)
      const maxCount = Math.max(...observationsByMonth)

      response.json({
        observationsCount: taxon.observations_count,
        observationsCountKr: kr.total_results,
        monthOfYear: maxCount > 0 ? observationsByMonth.indexOf(maxCount) + 1 : null,
        observationsByMonth
      })
    } catch (error) {
      logger.error('iNaturalist observations request error:', error)
      response.removeHeader('Cache-Control')
      response.status(500).send({ error: 'Error calling iNaturalist API' })
    }
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

    request({ url: apiUrl, timeout: 15000 }, function (error, res, body) {
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
      .filter(([key]) => key !== 'v')
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&')
    const apiUrl = `${baseApiUrl}&${queryParams}`

    request({ url: apiUrl, timeout: 15000 }, function (error, res, body) {
      if (error) {
        response.status(500).send({ error: '500에러 발생', details: error })
      } else {
        if (
          res.statusCode === 200 &&
          body.includes('<resultCode>00</resultCode>') &&
          body.includes('<item>')
        ) {
          response.set('Cache-Control', 'public, max-age=86400, s-maxage=604800')
        }
        response.status(res.statusCode).send(body)
      }
    })
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
