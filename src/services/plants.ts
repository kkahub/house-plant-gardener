// import axios from 'axios'
// import xm12js from 'xml2js'
// import { type HousePlantData, type HousePlantConvert } from '@/types/plants'

// const getHousePlantList = async () => {
//   const listParams = {
//     apiKey: import.meta.env.VITE_HOUSE_PLANT_API_KEY,
//     numOfRows: '12'
//   }

//   try {
//     const response = await axios.get('/service/garden/housePlantData', { params: listParams })
//     let housePlantData: HousePlantData[] = []
//     const housePlantList: HousePlantConvert[] = []

//     // 실내 가든 기본 정보 json변환
//     xm12js.parseString(response.data, (err, result) => {
//       if (err) {
//         throw err
//       }
//       housePlantData = result.response.body[0].items[0].item
//     })

//     // 실내 가든 기본 정보 편집
//     housePlantData.map((item: HousePlantData) => {
//       const {
//         rtnFileCours,
//         rtnFileSeCode,
//         rtnFileSn,
//         rtnImageDc,
//         rtnImgSeCode,
//         rtnOrginlFileNm,
//         rtnStreFileNm,
//         rtnThumbFileNm,
//         rtnThumbFileUrl,
//         ...plantsInfo
//       } = item

//       housePlantList.push(plantsInfo)
//     })
//     return housePlantList
//   } catch (error) {
//     return 'error'
//   }
// }

// export default getHousePlantList
