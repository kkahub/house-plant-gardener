import axios from 'axios'
import xm12js from 'xml2js'
import { type PlantShotData, type PlantShotConvert } from '@/types/plants'

const getPlantList = async () => {
  const shortParams = {
    apiKey: import.meta.env.VITE_API_KEY,
    numOfRows: '12'
  }

  try {
    const response = await axios.get('/service/garden/gardenList', { params: shortParams })
    const gardenShotList: PlantShotConvert[] = []
    let gardenList: PlantShotData[] = []
    const plantCode: string[] = []

    // 가든 기본 정보 json변환
    xm12js.parseString(response.data, (err, result) => {
      if (err) {
        throw err
      }
      gardenList = result.response.body[0].items[0].item
    })

    // 가든 기본 정보 편집
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
    return gardenShotList
  } catch (error) {
    return 'error'
  }
}

export default getPlantList
