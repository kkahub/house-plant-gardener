import axios from 'axios'
// import xm12js from 'xml2js'
import xm12js, { parseString } from 'xml2js'

const URL = 'lightList'

const getPlantList = async () => {
  const params = {
    apiKey: import.meta.env.VITE_API_KEY
  }

  try {
    const response = await axios.get('/service/garden/gardenList', { params: params })
    let gardenList = null
    xm12js.parseString(response.data, (err, result) => {
      if (err) {
        throw err
      }

      // gardenList = JSON.stringify(result.response.body[0].items[0].item, null, 4)
      gardenList = result.response.body[0].items[0].item
    })
    return gardenList
  } catch (error) {
    return 'error'
  }
}

export default getPlantList
