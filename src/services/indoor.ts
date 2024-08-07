import { type IndoorListData, type IndoorList, type IndoorDetail } from '@/types/indoor'
import * as xmlToJson from '../plugin/xmlToJson'
import { db } from '@/firebase/firebase'
import { deleteDoc, doc, getDoc, increment, serverTimestamp, setDoc } from 'firebase/firestore'

// 실내식물 리스트
const getIndoorList = async ({
  currentPage,
  currentPageSize,
  searchWord,
  light,
  growForm,
  leafColor,
  leafPattern,
  flowerColor,
  fruitColor,
  flowering,
  minTemp,
  waterCycle
}: {
  currentPage: number
  currentPageSize: number
  searchWord: string
  light: string
  growForm: string
  leafColor: string
  leafPattern: string
  flowerColor: string
  fruitColor: string
  flowering: string
  minTemp: string
  waterCycle: string
}) => {
  const listParams = {
    apiKey: import.meta.env.VITE_INDOOR_PLANT_API_KEY,
    pageNo: currentPage,
    numOfRows: currentPageSize,
    searchWord,
    light,
    growForm,
    leafColor,
    leafPattern,
    flowerColor,
    fruitColor,
    flowering,
    minTemp,
    waterCycle
  }

  console.log(
    `/service/indoor/gardenList?apiKey=apiKey` +
      `&pageNo=${listParams.pageNo}` +
      `&numOfRows=${listParams.numOfRows}` +
      `&sText=${listParams.searchWord}` +
      `&lightChkVal=${listParams.light}` +
      `&grwhstleChkVal=${listParams.growForm}` +
      `&lefcolrChkVal=${listParams.leafColor}` +
      `&lefmrkChkVal=${listParams.leafPattern}` +
      `&flclrChkVal=${listParams.flowerColor}` +
      `&fmldecolrChkVal=${listParams.fruitColor}` +
      `&ignSeasonChkVal=${listParams.flowering}` +
      `&winterLwetChkVal=${listParams.minTemp}` +
      `&waterCycleSel=${listParams.waterCycle}` +
      `&sType=sCntntsSj&wordType=cntntsSj`
  )

  try {
    const res = await fetch(
      `/service/indoor/gardenList?apiKey=${listParams.apiKey}` +
        `&pageNo=${listParams.pageNo}` +
        `&numOfRows=${listParams.numOfRows}` +
        `&sText=${listParams.searchWord}` +
        `&lightChkVal=${listParams.light}` +
        `&grwhstleChkVal=${listParams.growForm}` +
        `&lefcolrChkVal=${listParams.leafColor}` +
        `&lefmrkChkVal=${listParams.leafPattern}` +
        `&flclrChkVal=${listParams.flowerColor}` +
        `&fmldecolrChkVal=${listParams.fruitColor}` +
        `&ignSeasonChkVal=${listParams.flowering}` +
        `&winterLwetChkVal=${listParams.minTemp}` +
        `&waterCycleSel=${listParams.waterCycle}` +
        `&sType=sCntntsSj&wordType=cntntsSj`
    )

    // 식물 기본 정보 json변환
    const listString = await res.text()
    const listNode = new DOMParser().parseFromString(listString, 'text/xml')
    const listObject: any = xmlToJson.convertJson(listNode)
    const listData = listObject.response.body.items.item
    const plantInfoList: IndoorList[] | null = []

    if (listData !== undefined) {
      // 기본 정보 편집
      if (listData.length === undefined) {
        // 리스트가 한 개일 때 한 객체로만 들어옴
        const {
          rtnFileSeCode,
          rtnFileSn,
          rtnOrginlFileNm,
          rtnStreFileNm,
          rtnFileCours,
          rtnImageDc,
          rtnThumbFileNm,
          rtnImgSeCode,
          rtnThumbFileUrl,
          ...IndoorList
        } = listData
        IndoorList.rtnFileUrl = IndoorList.rtnFileUrl.split('|')
        IndoorList.total = 1
        plantInfoList.push(IndoorList)
      } else {
        listData.map((item: IndoorListData) => {
          const {
            rtnFileSeCode,
            rtnFileSn,
            rtnOrginlFileNm,
            rtnStreFileNm,
            rtnFileCours,
            rtnImageDc,
            rtnThumbFileNm,
            rtnImgSeCode,
            rtnThumbFileUrl,
            ...IndoorList
          } = item

          if (typeof IndoorList.rtnFileUrl === 'string') {
            IndoorList.rtnFileUrl = IndoorList.rtnFileUrl.split('|')
          }
          const list: any = IndoorList
          list.total = Number(listObject.response.body.items.totalCount)
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
  await setDoc(doc(db, 'indoor_likes', `${uid}_${plantCode}`), {
    uid,
    plantCode,
    createdAt: serverTimestamp()
  })
}

// 식물도감 좋아요 삭제
export async function removeLike(uid: string, plantCode: string) {
  await deleteDoc(doc(db, 'indoor_likes', `${uid}_${plantCode}`))
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
  const docSnap = await getDoc(doc(db, 'indoor_likes', `${uid}_${plantCode}`))
  return docSnap.exists()
}

// 식물도감 북마크 추가
export async function addBookmark(uid: string, plantCode: string) {
  await setDoc(doc(db, 'indoor_bookmarks', `${uid}_${plantCode}`), {
    uid,
    plantCode,
    createdAt: serverTimestamp()
  })
}

// 식물도감 북마크 삭제
export async function removeBookmark(uid: string, plantCode: string) {
  await deleteDoc(doc(db, 'indoor_bookmarks', `${uid}_${plantCode}`))
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
  const docSnap = await getDoc(doc(db, 'indoor_bookmarks', `${uid}_${plantCode}`))
  return docSnap.exists()
}

// 식물도감 노트 가져오기
export async function getNoteContent(uid: string, plantCode: string) {
  const docSnap = await getDoc(doc(db, 'indoor_notes', `${uid}_${plantCode}`))

  if (docSnap.data()?.note !== undefined) {
    return await docSnap.data()?.note
  }
}

// 식물도감 노트 추가
export async function addNote(uid: string, plantCode: string, note: string) {
  await setDoc(doc(db, 'indoor_notes', `${uid}_${plantCode}`), {
    uid,
    plantCode,
    note,
    createdAt: serverTimestamp()
  })
}

// 식물도감 노트 삭제
export async function removeNote(uid: string, plantCode: string) {
  await deleteDoc(doc(db, 'indoor_notes', `${uid}_${plantCode}`))
}

// 식물도감 노트 여부
export async function hasNote(uid: string, plantCode: string) {
  const docSnap = await getDoc(doc(db, 'indoor_notes', `${uid}_${plantCode}`))
  const data = docSnap.data()
  return data === undefined ? false : true
}

// 식물도감 상세 기본 정보
export const getIndoorBasic = async (name: string, code: string) => {
  const listParams = {
    apiKey: import.meta.env.VITE_INDOOR_PLANT_API_KEY,
    searchWord: name
  }

  try {
    const res = await fetch(
      `/service/indoor/gardenList?apiKey=${listParams.apiKey}` +
        `&numOfRows=500` +
        `&sText=${listParams.searchWord}` +
        `&sType=sCntntsSj&wordType=sCntntsSj`
    )

    // 식물 기본 정보 json변환
    const detailBaseString = await res.text()
    const detailBaseNode = new DOMParser().parseFromString(detailBaseString, 'text/xml')
    const detailBaseObject: any = xmlToJson.convertJson(detailBaseNode)
    const detailBaseDatas = detailBaseObject.response.body.items.item
    let detailBaseData
    let plantBaseInfo: IndoorList | null = null
    let detailData

    if (detailBaseDatas !== undefined) {
      if (detailBaseDatas.length > 1) {
        // 이름으로 검색한 결과가 여러 개일 경우
        detailBaseData = detailBaseDatas.filter((item: IndoorList) => {
          if (code === item.cntntsNo) return item
        })

        // 기본 정보 편집
        const {
          rtnFileSeCode,
          rtnFileSn,
          rtnOrginlFileNm,
          rtnStreFileNm,
          rtnFileCours,
          rtnImageDc,
          rtnThumbFileNm,
          rtnImgSeCode,
          rtnThumbFileUrl,
          ...IndoorList
        } = detailBaseData[0]

        IndoorList.rtnFileUrl = IndoorList.rtnFileUrl.split('|')
        plantBaseInfo = IndoorList
      } else {
        // 기본 정보 편집
        const {
          rtnFileSeCode,
          rtnFileSn,
          rtnOrginlFileNm,
          rtnStreFileNm,
          rtnFileCours,
          rtnImageDc,
          rtnThumbFileNm,
          rtnImgSeCode,
          rtnThumbFileUrl,
          ...IndoorList
        } = detailBaseDatas

        IndoorList.rtnFileUrl = IndoorList.rtnFileUrl.split('|')
        plantBaseInfo = IndoorList
      }
    }

    // 상세정보 가져오기
    if (plantBaseInfo !== null) {
      detailData = await getIndoorDetail(plantBaseInfo.cntntsNo)
    }
    return { ...plantBaseInfo, ...detailData }
  } catch (error) {
    return null
  }
}

// 식물도감 상세 정보
export const getIndoorDetail = async (code: string) => {
  const params = {
    apiKey: import.meta.env.VITE_INDOOR_PLANT_API_KEY,
    code
  }

  try {
    const res = await fetch(`/service/indoor/gardenDtl?apiKey=${params.apiKey}&cntntsNo=${code}`)

    // 식물 상세 정보 json변환
    const detailString = await res.text()
    const detailNode = new DOMParser().parseFromString(detailString, 'text/xml')
    const detailObject: any = xmlToJson.convertJson(detailNode)
    const detailData = detailObject.response.body.item

    // 도감 검색 결과 없음
    if (detailData === undefined) return

    // 오브젝트 값은 빈 텍스트로 변경(값이 없을 경우 빈 오브젝트로 들어오는 중)
    Object.entries(detailData).map(([key, val]) => {
      if (typeof val === 'object') {
        return (detailData[key] = '')
      }
    })

    return detailData
  } catch (error) {
    return 'error'
  }
}

export default getIndoorList
