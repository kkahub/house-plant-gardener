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

const { logger } = functions

const app = initializeApp({
  credential: cert(serviceAccount)
})
const db = getFirestore(app)
const region = 'asia-northeast3'

exports.onCreateLike = onDocumentCreated(
  {
    region,
    document: 'plant_like/{id}'
  },
  (event) => {
    const snapshot = event.data
    const data = snapshot.data()
    logger.log('data: ', data)
    db.doc(`guide/${data.plantCode}`).update({
      likeCount: FieldValue.increment(1)
    })
  }
)
