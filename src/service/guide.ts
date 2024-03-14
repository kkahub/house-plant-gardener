import axios from 'axios'
// import xm12js from 'xml2js'
import { type PlantListData, type PlantList } from '@/types/plants'
import * as xmlToJson from '../plugin/xmlToJson'

const getPlantGuideList = async () => {
  const params = {
    serviceKey: import.meta.env.VITE_PLANT_API_KEY,
    numOfRows: '12'
  }

  try {
    const res = await fetch(
      `/openapi/service/rest/PlantService/plntIlstrSearch?serviceKey=${params.serviceKey}?numOfRows=${params.numOfRows}`
    )

    // 식물 기본 정보 json변환
    const xmlString = await res.text()
    const xmlNode = new DOMParser().parseFromString(xmlString, 'text/xml')

    const data = xmlToJson.convertJson(xmlNode)
    const plantData = data.response.body.items.item
    const plantInfoList: PlantList[] = []

    // 가든 기본 정보 편집
    plantData.map((item: PlantListData) => {
      const {
        detailYn,
        frstRgstnDtm,
        lastUpdtDtm,
        notRcmmGnrlNm,
        plantSpecsScnm,
        snnmScnm,
        ...plantList
      } = item

      plantInfoList.push(plantList)
    })
    return plantInfoList
  } catch (error) {
    return 'error'
  }
}

export default getPlantGuideList
