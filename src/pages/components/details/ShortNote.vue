<template>
  <div>
    <div v-if="props.isNoteView" class="card note">
      <div class="card_title">
        노트
        <div class="btn_wrap">
          <button
            v-if="props.isEditNote"
            @click="props.noteSave(prevNote)"
            type="button"
            title="저장하기"
          >
            <font-awesome-icon :icon="['far', 'floppy-disk']" />
          </button>
          <button v-else @click="props.editNote" type="button" title="노트하기">
            <font-awesome-icon :icon="['far', 'pen-to-square']" />
          </button>
          <button @click="props.noteRemove" type="button" title="삭제하기">
            <font-awesome-icon :icon="['far', 'trash-can']" />
          </button>
        </div>
      </div>
      <div class="card_content">
        <textarea
          v-if="props.isEditNote"
          v-focus
          name="note_edit"
          class="note_edit"
          v-model="noteModel"
          placeholder="내용을 입력해주세요."
        ></textarea>
        <div v-else class="note_content">{{ props.noteContent }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  isNote: {
    type: Boolean,
    default: false
  },
  isNoteView: {
    type: Boolean,
    default: false
  },
  isEditNote: {
    type: Boolean,
    default: false
  },
  noteSave: {
    type: Function,
    default: () => {}
  },
  noteContent: {
    type: String,
    default: ''
  },
  editNote: {
    type: Function,
    default: () => {}
  },
  prevNote: {
    type: String,
    default: ''
  },
  noteRemove: {
    type: Function,
    default: () => {}
  }
})

const emit = defineEmits(['update:noteContent'])

const noteModel = computed({
  get: () => props.noteContent,
  set: (value) => emit('update:noteContent', value)
})
</script>

<style scoped></style>
