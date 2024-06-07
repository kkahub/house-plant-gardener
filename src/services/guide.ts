import { type PlantListData, type PlantList, type PlantDetail } from '@/types/plants'
import * as xmlToJson from '../plugin/xmlToJson'

import { db } from '@/firebase/firebase'
import { deleteDoc, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'

// 식물도감 리스트
const getPlantGuideList = async ({
  currentPage,
  currentPageSize,
  searchWord
}: {
  currentPage: number
  currentPageSize: number
  searchWord: string
}) => {
  const listParams = {
    serviceKey: import.meta.env.VITE_PLANT_API_KEY,
    pageNo: currentPage,
    numOfRows: currentPageSize,
    searchWord: searchWord
  }

  try {
    const res = await fetch(
      `/openapi/service/rest/PlantService/plntIlstrSearch?serviceKey=${listParams.serviceKey}&numOfRows=${listParams.numOfRows}&pageNo=${listParams.pageNo}&sw=${listParams.searchWord}`
    )

    // 식물 기본 정보 json변환
    const listString = await res.text()
    const listNode = new DOMParser().parseFromString(listString, 'text/xml')

    const listObject: any = xmlToJson.convertJson(listNode)
    const listData = listObject.response.body.items.item

    const plantInfoList: PlantList[] | null = []

    if (listData !== undefined) {
      // 가든 기본 정보 편집
      if (listData.length === undefined) {
        // 리스트가 한 개일 때 한 객체로만 들어옴
        const {
          detailYn,
          frstRgstnDtm,
          lastUpdtDtm,
          notRcmmGnrlNm,
          plantSpecsScnm,
          snnmScnm,
          ...plantList
        } = listData
        plantList.total = 1
        plantInfoList.push(plantList)
      } else {
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
      }
    }
    return plantInfoList
  } catch (error) {
    return null
  }
}

// 식물도감 게시물 정보
// export async function getPlantGuideInfo() {
//   const docSnap = await getDoc(doc(db, 'plantCode', plantCode))

//   if (!docSnap.exists()) {
//     throw new Error('Document does not exist!')
//   }

//   const data = docSnap.data()

//   return {
//     code: docSnap.plantCode,
//     ...data,
//     createdAt: data.createdAt?.toDate()
//   }
// }

// 식물도감 좋아요 추가
export async function addLike(uid: string, plantCode: string) {
  // 유저별 좋아요
  await setDoc(doc(db, 'guide_likes', `${uid}_${plantCode}`), {
    uid,
    plantCode,
    createdAt: serverTimestamp()
  })
}

// 식물도감 좋아요 삭제
export async function removeLike(uid: string, plantCode: string) {
  await deleteDoc(doc(db, 'guide_likes', `${uid}_${plantCode}`))
}

// 도감 식물 좋아요 수
export async function likeCountComputed(plantCode: string, likeCount: number) {
  await setDoc(doc(db, 'plantCode', plantCode), { likeCount })
}

// 식물도감 좋아요 여부
export async function hasLike(uid: string, plantCode: string) {
  const docSnap = await getDoc(doc(db, 'guide_likes', `${uid}_${plantCode}`))
  return docSnap.exists()
}

// 식물도감 북마크 추가
export async function addBookmark(uid: string, plantCode: string) {
  await setDoc(doc(db, 'guide_bookmarks', `${uid}_${plantCode}`), {
    uid,
    plantCode,
    createdAt: serverTimestamp()
  })
}

// 식물도감 북마크 삭제
export async function removeBookmark(uid: string, plantCode: string) {
  await deleteDoc(doc(db, 'guide_bookmarks', `${uid}_${plantCode}`))
}

// 식물도감 북마크 여부
export async function hasBookmark(uid: string, plantCode: string) {
  const docSnap = await getDoc(doc(db, 'guide_bookmarks', `${uid}_${plantCode}`))
  return docSnap.exists()
}

// 식물도감 상세페이지
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

export default getPlantGuideList
