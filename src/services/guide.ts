import { type GuideListData, type GuideList, type GuideDetail } from '@/types/guide'
import * as xmlToJson from '../plugin/xmlToJson'
import { db } from '@/firebase/firebase'
import { deleteDoc, doc, getDoc, increment, serverTimestamp, setDoc } from 'firebase/firestore'
import { useAuthStore } from '@/stores/auth'

const { isAuthenticated } = useAuthStore()

// 식물도감 리스트
const getGuideList = async ({
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

    const plantInfoList: GuideList[] | null = []

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
          ...GuideList
        } = listData
        GuideList.total = 1
        plantInfoList.push(GuideList)
      } else {
        listData.map((item: GuideListData) => {
          const {
            detailYn,
            frstRgstnDtm,
            lastUpdtDtm,
            notRcmmGnrlNm,
            plantSpecsScnm,
            snnmScnm,
            ...GuideList
          } = item
          const list: any = GuideList
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

// 식물도감 조회수 가져오기
export async function getReadCount(plantCode: string) {
  const docSnap = await getDoc(doc(db, 'plantCode', plantCode))

  if (docSnap.data()?.readCount !== undefined) {
    return await docSnap.data()?.readCount
  } else {
    return 0
  }
}

// 식물도감 조회수 증가
export async function incrementReadCount(plantCode: string, readCount: number) {
  await setDoc(doc(db, 'plantCode', plantCode), { readCount: increment(1) }, { merge: true })
}

// 식물도감 좋아요 추가
export async function addLike(uid: string, plantCode: string) {
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

// 식물도감 좋아요 수 +-
export async function likeCountComputed(plantCode: string, likeCount: number) {
  await setDoc(doc(db, 'plantCode', plantCode), { likeCount }, { merge: true })
}

// 식물도감 좋아요 수 가져오기
export async function getLikeCount(plantCode: string) {
  const docSnap = await getDoc(doc(db, 'plantCode', plantCode))

  if (docSnap.data()?.likeCount !== undefined) {
    return await docSnap.data()?.likeCount
  } else {
    return 0
  }
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

// 식물도감 북마크 수 +-
export async function updateBookmarkCount(plantCode: string, bookmarkCount: number) {
  await setDoc(doc(db, 'plantCode', plantCode), { bookmarkCount }, { merge: true })
}

// 식물도감 북마크 수 가져오기
export async function getBookmarkCount(plantCode: string) {
  const docSnap = await getDoc(doc(db, 'plantCode', plantCode))

  if (docSnap.data()?.bookmarkCount !== undefined) {
    return await docSnap.data()?.bookmarkCount
  } else {
    return 0
  }
}

// 식물도감 북마크 여부
export async function hasBookmark(uid: string, plantCode: string) {
  const docSnap = await getDoc(doc(db, 'guide_bookmarks', `${uid}_${plantCode}`))
  return docSnap.exists()
}

// 식물도감 노트 가져오기
export async function getNoteContent(uid: string, plantCode: string) {
  const docSnap = await getDoc(doc(db, 'guide_notes', `${uid}_${plantCode}`))

  if (docSnap.data()?.note !== undefined) {
    return await docSnap.data()?.note
  }
}

// 식물도감 노트 추가
export async function addNote(uid: string, plantCode: string, note: string) {
  await setDoc(doc(db, 'guide_notes', `${uid}_${plantCode}`), {
    uid,
    plantCode,
    note,
    createdAt: serverTimestamp()
  })
}

// 식물도감 노트 삭제
export async function removeNote(uid: string, plantCode: string) {
  await deleteDoc(doc(db, 'guide_notes', `${uid}_${plantCode}`))
}

// 식물도감 노트 여부
export async function hasNote(uid: string, plantCode: string) {
  const docSnap = await getDoc(doc(db, 'guide_notes', `${uid}_${plantCode}`))
  const data = docSnap.data()
  return data === undefined ? false : true
}

// 식물도감 상세페이지
export const getGuideDetail = async (code: string) => {
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

    // 도감 검색 결과 없음
    if (detailData === undefined) return

    // 로그인 회원만 조회수 가져온 후 증가
    if (isAuthenticated === true) {
      const readCount = await getReadCount(code)
      incrementReadCount(code, readCount)
    }

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

    const GuideDetail: GuideDetail = info

    return GuideDetail
  } catch (error) {
    return 'error'
  }
}

export default getGuideList
