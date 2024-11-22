export interface IndoorListParams {
  apiKey: string
  pageNo: number
  numOfRows: number
  sText: string
  lightChkVal: string
  grwhstleChkVal: string
  lefcolrChkVal: string
  lefmrkChkVal: string
  flclrChkVal: string
  fmldecolrChkVal: string
  ignSeasonChkVal: string
  winterLwetChkVal: string
  waterCycleSel: string
}

/**
 *
 * 실내정원용 식물 리스트
 *
 * cntntsNo : 넘버(아이디)
 * cntntsSj : 식물명
 * rtnFileSeCode: 파일구분코드
 * rtnFileSn: 파일순번
 * rtnOrginlFileNm: 원본 파일명
 * rtnStreFileNm: 저장 파일명
 * rtnFileCours: 파일경로
 * rtnImageDc: 이미지설명
 * rtnThumbFileNm: 썸네일파일명
 * rtnImgSeCode: 이미지구분코드
 * rtnFileUrl: 이미지 주소
 * rtnThumbFileUrl: 썸네일 파일 URL (100 * 100px)
 *
 */

export interface IndoorList {
  cntntsNo: string
  cntntsSj: string
  rtnFileUrl: string[]
  total: number
}
export interface IndoorListData {
  cntntsNo: string
  cntntsSj: string
  rtnFileSeCode: string
  rtnFileSn: string
  rtnOrginlFileNm: string
  rtnFileCours: string
  rtnImageDc: string
  rtnThumbFileNm: string
  rtnImgSeCode: string
  rtnStreFileNm: string
  rtnFileUrl: string | string[]
  rtnThumbFileUrl: string
}

/**
 *
 * 실내정원용 식물 상세페이지
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

export interface IndoorDetail {
  brdMthdDesc: string
}
export interface IndoorDetailData {
  bfofMthod: string
}
