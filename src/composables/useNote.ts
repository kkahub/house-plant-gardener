import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { getNoteContent, addNote, removeNote, hasNote } from '@/services/guide'

export const useNote = (code: string) => {
  const isNote = ref(false)
  const isNoteView = ref(false)
  const isEditNote = ref(false)
  const guideCode = ref(code)
  const noteContent = ref('')
  const { uid, isAuthenticated } = storeToRefs(useAuthStore())

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
        // 노트 있을 때 -> 노트 내용 가져오기
        noteContent.value = await getNoteContent(uid.value, guideCode.value)
      } else {
        // 노트 없을 때 -> 바로 에디터 모드
        isEditNote.value = true
      }
    }
    isNoteView.value = !isNoteView.value
  }

  // 노트 저장
  const noteSave = async (prevNote: string) => {
    if (noteContent.value === '') {
      alert('내용을 입력해주세요.')
      return
    }

    // 내용이 변경되었을 때만 저장
    if (prevNote !== noteContent.value) {
      await addNote(uid.value, guideCode.value, noteContent.value)
      alert('노트를 저장했습니다.')
    }
    isEditNote.value = false
    isNote.value = true
  }

  // 노트 삭제
  const noteRemove = async () => {
    if (confirm('노트를 삭제하시겠습니까?')) {
      await removeNote(uid.value, guideCode.value)
      isNote.value = false
      isEditNote.value = false
      isNoteView.value = false
    }
  }

  watch(isAuthenticated, () => getNoteStatus(), { immediate: true })

  return {
    isNote,
    isNoteView,
    isEditNote,
    getNoteStatus,
    toggleNote,
    noteSave,
    noteContent,
    noteRemove
  }
}
