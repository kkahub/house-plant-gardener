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

// 라이선스 없는 사진 제외
const INAT_PHOTO_LICENSES = [
  'cc0',
  'cc-by',
  'cc-by-sa',
  'cc-by-nc',
  'cc-by-nc-sa',
  'cc-by-nd',
  'cc-by-nc-nd'
]
const INAT_PHOTO_MAX = 10

const getJson = async (path) => {
  const res = await fetch(`https://api.inaturalist.org/v2/${path}`, {
    headers: { 'User-Agent': 'house-plant-gardener' }
  })
  if (!res.ok) throw new Error(`iNaturalist ${res.status}`)
  return res.json()
}

const isLicensed = (photo) => INAT_PHOTO_LICENSES.includes(photo?.license_code)

const findTaxon = async (name, extraFields = '') => {
  const { results = [] } = await getJson(
    `taxa?q=${encodeURIComponent(name)}&per_page=5&fields=id,name,matched_term,default_photo.id,default_photo.medium_url,default_photo.license_code,default_photo.attribution${extraFields}`
  )
  return results.find((item) => item.name === name || item.matched_term === name)
}

const getObservationPhotos = async (taxonId, perPage) => {
  const { results = [] } = await getJson(
    `observations?taxon_id=${taxonId}&photo_license=${INAT_PHOTO_LICENSES.join(',')}&quality_grade=research&order_by=votes&per_page=${perPage}&fields=photos.id,photos.url,photos.license_code,photos.attribution`
  )
  return results.flatMap((item) =>
    (item.photos ?? []).map((photo) => ({
      ...photo,
      medium_url: photo.url?.replace('/square.', '/medium.')
    }))
  )
}

const toPhotoResponse = (photo) => ({
  id: photo.id,
  licenseCode: photo.license_code,
  mediumUrl: photo.medium_url,
  attribution: photo.attribution
})

// 식물도감 iNaturalist 이미지 호출
exports.inaturalistImg = functions.region(region).https.onRequest((req, response) => {
  cors(req, response, async () => {
    const name = req.query.name

    if (typeof name !== 'string' || name === '') {
      response.status(400).send({ error: 'name 파라미터가 필요합니다' })
      return
    }

    try {
      const taxon = await findTaxon(name)
      let photo = taxon?.default_photo

      if (taxon && !isLicensed(photo)) {
        photo = (await getObservationPhotos(taxon.id, 1)).find(isLicensed)
      }

      response.set('Cache-Control', 'public, max-age=86400, s-maxage=604800')
      response.json(photo?.medium_url ? toPhotoResponse(photo) : null)
    } catch (error) {
      logger.error('iNaturalist API request error:', error)
      response.status(500).send({ error: 'Error calling iNaturalist API' })
    }
  })
})

// 식물도감 상세 iNaturalist 사진과 관찰 기록 호출
exports.inaturalist = functions.region(region).https.onRequest((req, response) => {
  cors(req, response, async () => {
    const name = req.query.name

    if (typeof name !== 'string' || name === '') {
      response.status(400).send({ error: 'name 파라미터가 필요합니다' })
      return
    }

    try {
      const taxon = await findTaxon(name, ',observations_count')

      response.set('Cache-Control', 'public, max-age=86400, s-maxage=604800')

      if (!taxon) {
        response.json(null)
        return
      }

      // 6891: 대한민국. 라이선스 필터는 관찰 수를 바꾸므로 사진은 따로 조회
      const [kr, histogram, observationPhotos] = await Promise.all([
        getJson(`observations?taxon_id=${taxon.id}&place_id=6891&per_page=0`),
        getJson(
          `observations/histogram?taxon_id=${taxon.id}&interval=month_of_year&date_field=observed`
        ),
        getObservationPhotos(taxon.id, INAT_PHOTO_MAX)
      ])
      const months = histogram.results?.month_of_year ?? {}
      const observationsByMonth = Array.from({ length: 12 }, (_, i) => months[i + 1] ?? 0)
      const maxCount = Math.max(...observationsByMonth)

      const photos = [{ ...taxon.default_photo }, ...observationPhotos]
        .filter(
          (photo, index, list) =>
            isLicensed(photo) &&
            photo.medium_url &&
            list.findIndex((item) => item.id === photo.id) === index
        )
        .slice(0, INAT_PHOTO_MAX)
        .map(toPhotoResponse)

      response.json({
        photos,
        observationsCount: taxon.observations_count,
        observationsCountKr: kr.total_results,
        monthOfYear: maxCount > 0 ? observationsByMonth.indexOf(maxCount) + 1 : null,
        observationsByMonth
      })
    } catch (error) {
      logger.error('iNaturalist request error:', error)
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
