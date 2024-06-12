import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { getNoteContent, addNote, removeNote, hasNote } from '@/services/guide'

export const useNote = (code: string) => {
  const { uid, isAuthenticated } = storeToRefs(useAuthStore())
  const isNote = ref(false)
  const isNoteView = ref(false)
  const isEditNote = ref(false)
  const guideCode = ref(code)
  const noteContent = ref('')

  // 로그인 시 노트 상태 가져오기
  const getNoteStatus = async () => {
    if (isAuthenticated.value === false) {
      isNote.value = false
      return
    }

    // 노트 상태 가져오기
    isNote.value = await hasNote(uid.value, guideCode.value)

    // 노트 내용 가져오기
    if (isNote.value) {
      noteContent.value = await getNoteContent(uid.value, guideCode.value)
      isNoteView.value = true
    }
  }

  // 노트 토글
  const toggleNote = async () => {
    if (isAuthenticated.value === false) {
      alert('로그인 후 이용해주세요.')
      return
    }

    if (isNoteView.value) {
      isEditNote.value = false
    } else {
      if (isNote.value) {
        // 노트 있을 때
        noteContent.value = await getNoteContent(uid.value, guideCode.value)
      } else {
        // 노트 없을 때
        isEditNote.value = true
      }
    }
    isNoteView.value = !isNoteView.value
  }

  // 노트 저장
  const noteSave = async () => {
    if (noteContent.value === '') {
      alert('내용을 입력해주세요.')
      return
    }
    await addNote(uid.value, guideCode.value, noteContent.value)
    isEditNote.value = false
    isNote.value = true
  }

  watch(isAuthenticated, () => getNoteStatus(), { immediate: true })

  return {
    isNote,
    isNoteView,
    isEditNote,
    getNoteStatus,
    toggleNote,
    noteSave,
    noteContent
  }
}
