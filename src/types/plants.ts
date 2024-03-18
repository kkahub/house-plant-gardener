/**
 *
 * 식물도감 기본정보
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
  response: PlantListBody
}

/**
 *
 * 식물도감 상세페이지
 *
 * brdMthdDesc:	번식방법
 * grwEvrntDesc: 생육환경
 * rrngType: 생육형
 * cprtCtnt:	저작권
 * dstrb:	분포정보
 * osDstrb: 해외 분포
 * familyKorNm:	과국명
 * familyNm:	과명
 * farmSpftDesc: 재배특성
 * flwrDesc:	꽃설명
 * fritDesc:	열매설명
 * rootDesc: 뿌리설명
 * genusKorNm:	속국명
 * genusNm:	속명
 * imgUrl:	이미지url
 * leafDesc:	잎설명
 * note:	노트
 * orplcNm:	원산지
 * plantGnrlNm:	국명
 * plantSpecsScnm:	학명
 * shpe:	형태
 * smlrPlntDesc:	유사식물설명
 * spft:	특징
 * sporeDesc:	포자
 * stemDesc:	줄기설명
 * sz:	크기설명
 * useMthdDesc:	사용법
 *
 */

export interface PlantDetail {
  brdMthdDesc: string
  grwEvrntDesc: string
  rrngType: string
  cprtCtnt: string
  dstrb: string
  osDstrb: string
  familyKorNm: string
  familyNm: string
  farmSpftDesc: string
  flwrDesc: string
  fritDesc: string
  rootDesc: string
  genusKorNm: string
  genusNm: string
  imgUrl: string
  leafDesc: string
  note: string
  orplcNm: string
  plantGnrlNm: string
  plantSpecsScnm: string
  shpe: string
  smlrPlntDesc: string
  spft: string
  sporeDesc: string
  stemDesc: string
  sz: string
  useMthdDesc: string
}
export interface PlantDetailData {
  bfofMthod: string
  branchDesc: string
  brdMthdDesc: string
  bugInfo: string
  cprtCtnt: string
  dstrb: string
  engNm: string
  familyKorNm: string
  familyNm: string
  farmSpftDesc: string
  flwrDesc: string
  flwrInfo01: string
  flwrInfo02: string
  flwrInfo03: string
  flwrInfo04: string
  flwrInfo05: string
  flwrInfo06: string
  flwrInfo07: string
  flwrInfo08: string
  flwrInfo09: string
  fritDesc: string
  fritInfo01: string
  frstRgstnDtm: string
  gemmaDesc: string
  genusKorNm: string
  genusNm: string
  grwEvrntDesc: string
  imgUrl: string
  inductionDesc: string
  lastUpdtDtm: string
  leafDesc: string
  leafInfo01: string
  leafInfo02: string
  leafInfo03: string
  leafInfo04: string
  leafInfo05: string
  leafInfo06: string
  leafInfo07: string
  leafInfo08: string
  leafInfo09: string
  leafInfo10: string
  note: string
  orplcNm: string
  osDstrb: string
  peltDesc: string
  plantGnrlNm: string
  plantPilbkNo: string
  plantScnmId: string
  plantSpecsScnm: string
  prtcPlnDesc: string
  ramentumDesc: string
  ramentumInfo01: string
  ramentumInfo02: string
  rootDesc: string
  rrngGubun: string
  rrngType: string
  shpe: string
  smlrPlntDesc: string
  spft: string
  sporeDesc: string
  sporeInfo01: string
  sporeInfo02: string
  sporeInfo03: string
  sporeInfo04: string
  sporeInfo05: string
  sporeInfo06: string
  sporeInfo07: string
  sporeInfo08: string
  sporeInfo09: string
  stemDesc: string
  stemInfo01: string
  stemInfo02: string
  stemInfo03: string
  stemInfo04: string
  stemInfo05: string
  stemInfo06: string
  stemInfo07: string
  stemInfo08: string
  sz: string
  useMthdDesc: string
  woodDesc: string
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
