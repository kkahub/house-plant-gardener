import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { getNoteContent, addNote, removeNote, hasNote } from '@/services/guide'

export const useNote = (code: string, isBookmark: boolean) => {
  const { uid, isAuthenticated } = storeToRefs(useAuthStore())

  const isNote = ref(false)
  const isEditNote = ref(false)
  const guideCode = ref(code)
  const noteContent = ref('')

  // 로그인 시 노트 상태 가져오기
  const getNoteStatus = async () => {
    if (isAuthenticated.value === false || isBookmark === false) {
      isNote.value = false
      return
    }

    // 노트 상태 가져오기
    isNote.value = await hasNote(uid.value, guideCode.value)
    console.log('get isNote : ', isNote.value)
  }

  // 노트 토글
  const toggleNote = async () => {
    if (isAuthenticated.value === false) {
      alert('로그인 후 이용해주세요.')
      return
    }

    if (isNote.value) {
      noteContent.value = await getNoteContent(uid.value, guideCode.value)
      console.log('noteContent : ', noteContent.value)
      isEditNote.value = false
      //   await removeNote(uid.value, guideCode.value)
      //   // noteContentComputed(guideCode.value, noteContent.value)
    } else {
      isEditNote.value = true

      //   await addNote(uid.value, guideCode.value, noteContent.value)
      //   // noteContentComputed(guideCode.value, noteContent.value)
    }
    isNote.value = !isNote.value
  }

  // 노트 저장
  const noteSave = async () => {
    if (noteContent.value === '') {
      alert('내용을 입력해주세요.')
      return
    }
    await addNote(uid.value, guideCode.value, noteContent.value)
  }

  watch(isAuthenticated, () => getNoteStatus(), { immediate: true })

  return {
    isNote,
    isEditNote,
    getNoteStatus,
    toggleNote,
    noteSave,
    noteContent
  }
}
