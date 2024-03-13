import axios from 'axios'
import xm12js from 'xml2js'
import { type PlantShotData, type PlantShotConvert } from '@/types/plants'

const getPlantList = async () => {
  const params = {
    apiKey: import.meta.env.VITE_API_KEY
  }

  try {
    const response = await axios.get('/service/garden/gardenList', { params: params })
    const gardenShotList: PlantShotConvert[] = []

    xm12js.parseString(response.data, (err, result) => {
      if (err) {
        throw err
      }
      const gardenList = result.response.body[0].items[0].item

      gardenList.map((item: PlantShotData) => {
        const {
          rtnFileCours,
          rtnFileSeCode,
          rtnFileSn,
          rtnImageDc,
          rtnImgSeCode,
          rtnOrginlFileNm,
          rtnStreFileNm,
          rtnThumbFileNm,
          rtnThumbFileUrl,
          ...gardenShot
        } = item
        gardenShotList.push(gardenShot)
      })
    })
    return gardenShotList
  } catch (error) {
    return 'error'
  }
}

export default getPlantList
