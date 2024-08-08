import { type GuideListData, type GuideList, type GuideDetail } from '@/types/guide'
import * as xmlToJson from '../plugin/xmlToJson'
import { db } from '@/firebase/firebase'
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where
} from 'firebase/firestore'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const { uid, isAuthenticated } = storeToRefs(useAuthStore())

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
    serviceKey: import.meta.env.VITE_GUIDE_API_KEY,
    pageNo: currentPage,
    numOfRows: currentPageSize,
    searchWord
  }

  try {
    const res = await fetch(
      `https://proxy.cors.sh/http://openapi.nature.go.kr/openapi/service/rest/PlantService` +
        `/plntIlstrSearch?serviceKey=${listParams.serviceKey}` +
        `&numOfRows=${listParams.numOfRows}` +
        `&pageNo=${listParams.pageNo}` +
        `&sw=${listParams.searchWord}`,
      {
        headers: {
          'x-cors-api-key': 'temp_008dc0812a8ed83e95a028ec31b5b912'
        }
      }
    )

    // 식물 기본 정보 json변환
    const listString = await res.text()
    console.log('확인 guide', listString)
    const listNode = new DOMParser().parseFromString(listString, 'text/xml')
    const listObject: any = xmlToJson.convertJson(listNode)
    const listData = listObject.response.body.items.item
    const plantInfoList: GuideList[] | null = []

    if (listData !== undefined) {
      // 기본 정보 편집
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

export default getGuideList

// 식물도감 조회수 가져오기
export async function getReadCount(name: string, plantCode: string) {
  const docSnap = await getDoc(doc(db, 'plantId', `${name}_${plantCode}`))

  if (docSnap.data()?.readCount !== undefined) {
    return await docSnap.data()?.readCount
  } else {
    return 0
  }
}

// 식물도감 조회수 증가
export async function incrementReadCount(name: string, plantCode: string, readCount: number) {
  await setDoc(
    doc(db, 'plantId', `${name}_${plantCode}`),
    { readCount: increment(1) },
    { merge: true }
  )
}

// 식물도감 좋아요 추가
export async function addLike(uid: string, plantId: string) {
  await setDoc(doc(db, 'guide_likes', `${uid}_${plantId}`), {
    uid,
    plantId,
    createdAt: serverTimestamp()
  })
}

// 식물도감 좋아요 삭제
export async function removeLike(uid: string, plantId: string) {
  await deleteDoc(doc(db, 'guide_likes', `${uid}_${plantId}`))
}

// 식물도감 좋아요 수 +-
export async function likeCountComputed(name: string, plantCode: string, likeCount: number) {
  await setDoc(doc(db, 'plantId', `${name}_${plantCode}`), { likeCount }, { merge: true })
}

// 식물도감 좋아요 수 가져오기
export async function getLikeCount(name: string, plantCode: string) {
  const docSnap = await getDoc(doc(db, 'plantId', `${name}_${plantCode}`))

  if (docSnap.data()?.likeCount !== undefined) {
    return await docSnap.data()?.likeCount
  } else {
    return 0
  }
}

// 식물도감 좋아요 여부
export async function hasLike(uid: string, plantId: string) {
  const docSnap = await getDoc(doc(db, 'guide_likes', `${uid}_${plantId}`))
  return docSnap.exists()
}

// 식물도감 북마크 추가
export async function addBookmark(uid: string, plantId: string) {
  await setDoc(doc(db, 'guide_bookmarks', `${uid}_${plantId}`), {
    uid,
    plantId,
    createdAt: serverTimestamp()
  })
}

// 식물도감 북마크 삭제
export async function removeBookmark(uid: string, plantId: string) {
  await deleteDoc(doc(db, 'guide_bookmarks', `${uid}_${plantId}`))
}

// 식물도감 북마크 수 +-
export async function updateBookmarkCount(name: string, plantCode: string, bookmarkCount: number) {
  await setDoc(doc(db, 'plantId', `${name}_${plantCode}`), { bookmarkCount }, { merge: true })
}

// 식물도감 북마크 수 가져오기
export async function getBookmarkCount(name: string, plantCode: string) {
  const docSnap = await getDoc(doc(db, 'plantId', `${name}_${plantCode}`))

  if (docSnap.data()?.bookmarkCount !== undefined) {
    return await docSnap.data()?.bookmarkCount
  } else {
    return 0
  }
}

// 식물도감 북마크 여부
export async function hasBookmark(uid: string, plantId: string) {
  const docSnap = await getDoc(doc(db, 'guide_bookmarks', `${uid}_${plantId}`))
  return docSnap.exists()
}

// 식물도감 노트 가져오기
export async function getNoteContent(uid: string, plantId: string) {
  const docSnap = await getDoc(doc(db, 'guide_notes', plantId))

  if (docSnap.data()?.note !== undefined) {
    return await docSnap.data()?.note
  }
}

// 식물도감 노트 추가
export async function addNote(uid: string, plantId: string, note: string) {
  await setDoc(doc(db, 'guide_notes', `${uid}_${plantId}`), {
    uid,
    plantId,
    note,
    createdAt: serverTimestamp()
  })
}

// 식물도감 노트 삭제
export async function removeNote(uid: string, plantId: string) {
  await deleteDoc(doc(db, 'guide_notes', `${uid}_${plantId}`))
}

// 식물도감 노트 여부
export async function hasNote(uid: string, plantId: string) {
  const docSnap = await getDoc(doc(db, 'guide_notes', `${uid}_${plantId}`))
  const data = docSnap.data()
  return data === undefined ? false : true
}

// 식물도감 상세페이지
export const getGuideDetail = async (name: string, code: string) => {
  const params = {
    serviceKey: import.meta.env.VITE_PLANT_API_KEY,
    q1: code
  }

  try {
    const res = await fetch(
      `/service/guide/plntIlstrInfo?serviceKey=${params.serviceKey}&q1=${params.q1}`
    )

    // 식물 상세 정보 json변환
    const detailString = await res.text()
    const detailNode = new DOMParser().parseFromString(detailString, 'text/xml')
    const detailObject: any = xmlToJson.convertJson(detailNode)
    const detailData = detailObject.response.body.item

    // 도감 검색 결과 없음
    if (detailData === undefined) return

    // 로그인 회원만 조회수 가져온 후 증가
    if (isAuthenticated.value === true) {
      const readCount = await getReadCount(name, code)
      incrementReadCount(name, code, readCount)
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

export const getBookmarkID = async () => {
  const keyword = uid.value
  const q = query(
    collection(db, 'guide_bookmarks'),
    where('uid', '==', keyword),
    orderBy('createdAt', 'desc')
  )
  const querySnapshot = await getDocs(q)

  return querySnapshot.docs.map((docu) => docu.data())
}

export const getBookmarkList = async ({
  currentPage,
  currentPageSize,
  searchWord
}: {
  currentPage: number
  currentPageSize: number
  searchWord: string | string[]
}) => {
  const searchName = Object.values(searchWord).map((item) => item.split('_')[0])
  const searchCode = Object.values(searchWord).map((item) => item.split('_')[1])

  const listParams = {
    serviceKey: import.meta.env.VITE_GUIDE_API_KEY,
    pageNo: currentPage,
    numOfRows: currentPageSize,
    searchWord
  }

  const res = await Promise.all(
    searchName.map((keyword) =>
      fetch(
        `/service/guide/plntIlstrSearch?serviceKey=${listParams.serviceKey}&numOfRows=${listParams.numOfRows}&pageNo=${listParams.pageNo}&sw=${keyword}`
      )
    )
  )

  const resArray = await Promise.all(
    res.map(async (item, index) => {
      let plantInfoList: GuideList[] | null = []

      // 식물 기본 정보 json변환
      const listString = await item.text()
      const listNode = new DOMParser().parseFromString(listString, 'text/xml')
      const listObject: any = xmlToJson.convertJson(listNode)
      const listData = listObject.response.body.items.item
      const code: string = searchCode[index]
      let accordItem = []

      // 여러개일 경우 일치하는 아이템 찾기
      if (listData.length !== undefined) {
        accordItem = listData.filter(
          (item: GuideListData) => code === (item.plantPilbkNo as unknown)
        )
      } else {
        accordItem = [listData]
      }

      const {
        detailYn,
        frstRgstnDtm,
        lastUpdtDtm,
        notRcmmGnrlNm,
        plantSpecsScnm,
        snnmScnm,
        ...GuideList
      } = accordItem[0]

      GuideList.total = searchCode.length

      return (plantInfoList = { ...GuideList })
    })
  )

  return resArray
}

export const getNoteID = async () => {
  const keyword = uid.value
  const q = query(
    collection(db, 'guide_notes'),
    where('uid', '==', keyword),
    orderBy('createdAt', 'desc')
  )
  const querySnapshot = await getDocs(q)

  return querySnapshot.docs.map((docu) => docu.data())
}

export const getNoteList = async ({
  currentPage,
  currentPageSize,
  searchWord
}: {
  currentPage: number
  currentPageSize: number
  searchWord: string | string[]
}) => {
  const searchName = Object.values(searchWord).map((item) => item.split('_')[0])
  const searchCode = Object.values(searchWord).map((item) => item.split('_')[1])

  const listParams = {
    serviceKey: import.meta.env.VITE_GUIDE_API_KEY,
    pageNo: currentPage,
    numOfRows: currentPageSize,
    searchWord
  }

  const res = await Promise.all(
    searchName.map((keyword) =>
      fetch(
        `/service/guide/plntIlstrSearch?serviceKey=${listParams.serviceKey}&numOfRows=${listParams.numOfRows}&pageNo=${listParams.pageNo}&sw=${keyword}`
      )
    )
  )

  const resArray = await Promise.all(
    res.map(async (item, index) => {
      let plantInfoList: GuideList[] | null = []

      // 식물 기본 정보 json변환
      const listString = await item.text()
      const listNode = new DOMParser().parseFromString(listString, 'text/xml')
      const listObject: any = xmlToJson.convertJson(listNode)
      const listData = listObject.response.body.items.item
      const code: string = searchCode[index]
      let accordItem = []

      // 여러개일 경우 일치하는 아이템 찾기
      if (listData.length !== undefined) {
        accordItem = listData.filter(
          (item: GuideListData) => code === (item.plantPilbkNo as unknown)
        )
      } else {
        accordItem = [listData]
      }

      const {
        detailYn,
        frstRgstnDtm,
        lastUpdtDtm,
        notRcmmGnrlNm,
        plantSpecsScnm,
        snnmScnm,
        ...GuideList
      } = accordItem[0]

      GuideList.total = searchCode.length

      return (plantInfoList = { ...GuideList })
    })
  )

  return resArray
}
