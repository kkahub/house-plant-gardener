import { type PlantListData, type PlantList, type PlantDetail } from '@/types/plants'
import * as xmlToJson from '../plugin/xmlToJson'

// const getPlantGuideList = async (size: number, rows: number) => {
const getPlantGuideList = async ({
  currentPage,
  currentPageSize
}: {
  currentPage: number
  currentPageSize: number
}) => {
  const listParams = {
    serviceKey: import.meta.env.VITE_PLANT_API_KEY,
    pageNo: currentPage,
    numOfRows: currentPageSize
  }

  try {
    const res = await fetch(
      `/openapi/service/rest/PlantService/plntIlstrSearch?serviceKey=${listParams.serviceKey}&numOfRows=${listParams.numOfRows}&pageNo=${listParams.pageNo}`
    )

    // 식물 기본 정보 json변환
    const listString = await res.text()
    const listNode = new DOMParser().parseFromString(listString, 'text/xml')

    const listObject: any = xmlToJson.convertJson(listNode)
    const listData = listObject.response.body.items.item
    const plantInfoList: PlantList[] = []

    // 가든 기본 정보 편집
    listData.map((item: PlantListData) => {
      const {
        detailYn,
        frstRgstnDtm,
        lastUpdtDtm,
        notRcmmGnrlNm,
        plantSpecsScnm,
        snnmScnm,
        ...plantList
      } = item

      const list: any = plantList
      list.total = Number(listObject.response.body.totalCount)
      plantInfoList.push(list)
    })
    return plantInfoList
  } catch (error) {
    return 'error'
  }
}

export default getPlantGuideList

export const getPlantDetail = async (code: string | string[]) => {
  const params = {
    serviceKey: import.meta.env.VITE_PLANT_API_KEY,
    q1: code
  }

  try {
    const res = await fetch(
      `/openapi/service/rest/PlantService/plntIlstrInfo?serviceKey=${params.serviceKey}&q1=${params.q1}`
    )

    // 식물 상세 정보 json변환
    const detailString = await res.text()

    const detailNode = new DOMParser().parseFromString(detailString, 'text/xml')

    const detailObject: any = xmlToJson.convertJson(detailNode)
    const detailData = detailObject.response.body.item

    // 가든 상세 정보 편집
    const {
      engNm,
      bfofMthod,
      branchDesc,
      bugInfo,
      flwrInfo01,
      flwrInfo02,
      flwrInfo03,
      flwrInfo04,
      flwrInfo05,
      flwrInfo06,
      flwrInfo07,
      flwrInfo08,
      flwrInfo09,
      fritInfo01,
      frstRgstnDtm,
      gemmaDesc,
      inductionDesc,
      lastUpdtDtm,
      leafInfo01,
      leafInfo02,
      leafInfo03,
      leafInfo04,
      leafInfo05,
      leafInfo06,
      leafInfo07,
      leafInfo08,
      leafInfo09,
      leafInfo10,
      peltDesc,
      plantPilbkNo,
      plantScnmId,
      prtcPlnDesc,
      ramentumDesc,
      ramentumInfo01,
      ramentumInfo02,
      rrngGubun,
      sporeInfo01,
      sporeInfo02,
      sporeInfo03,
      sporeInfo04,
      sporeInfo05,
      sporeInfo06,
      sporeInfo07,
      sporeInfo08,
      sporeInfo09,
      stemInfo01,
      stemInfo02,
      stemInfo03,
      stemInfo04,
      stemInfo05,
      stemInfo06,
      stemInfo07,
      stemInfo08,
      woodDesc,
      ...info
    } = detailData

    const plantDetail: PlantDetail = info

    return plantDetail
  } catch (error) {
    return 'error'
  }
}
