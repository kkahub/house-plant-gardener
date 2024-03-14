/**
 *
 * 식물 도감
 *
 * cprtCtnt: 저작권
 * familyKorNm: 과국명
 * familyNm: 과명
 * genusKorNm: 속국명
 * genusNm: 속명
 * imgUrl: 이미지 URL
 * plantGnrlNm: 국명
 * plantPilbkNo: 도감번호
 *
 */
export interface PlantList {
  cprtCtnt: string[]
  familyKorNm: string[]
  familyNm: string[]
  genusKorNm: string[]
  genusNm: string[]
  imgUrl: string[]
  plantGnrlNm: string[]
  plantPilbkNo: string[]
}
export interface PlantListData {
  cprtCtnt: string[]
  detailYn: string[]
  familyKorNm: string[]
  familyNm: string[]
  frstRgstnDtm: string[]
  genusKorNm: string[]
  genusNm: string[]
  imgUrl: string[]
  lastUpdtDtm: string[]
  notRcmmGnrlNm: string[]
  plantGnrlNm: string[]
  plantPilbkNo: string[]
  plantSpecsScnm: string[]
  snnmScnm: string[]
}
export interface PlantListItem {
  item: PlantListData
}
export interface PlantListItems {
  items: PlantListItem
}
export interface PlantListBody {
  body: PlantListItems
}
export interface PlantListRes {
  // response: PlantListBody
}

/**
 *
 * 실내 정원용 식물
 *
 * cntntsNo : 넘버
 * cntntsSj : 식물명
 * rtnFileUrl: 이미지 주소
 *
 */

export interface HousePlantData {
  rtnFileCours: string[]
  rtnFileSeCode: string[]
  rtnFileSn: string[]
  rtnImageDc: string[]
  rtnImgSeCode: string[]
  rtnOrginlFileNm: string[]
  rtnStreFileNm: string[]
  rtnThumbFileNm: string[]
  rtnThumbFileUrl: string[]
  cntntsNo: string[]
  cntntsSj: string[]
  rtnFileUrl: string[]
}
export interface HousePlantConvert {
  cntntsNo: string | string[]
  cntntsSj: string | string[]
  rtnFileUrl: string[]
}
export interface HousePlantIndex {
  [index: number]: HousePlantConvert
  [index: string]: HousePlantConvert
}
