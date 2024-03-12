// cntntsNo : 넘버
// cntntsSj : 식물명
// rtnFileUrl: 이미지 주소

export interface PlantShotData {
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
export interface PlantShotCovert {
  cntntsNo: string | string[]
  cntntsSj: string | string[]
  rtnFileUrl: string[]
}
export interface Test {
  PlantShotCovert
}
