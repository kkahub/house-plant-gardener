import { ref, inject } from 'vue'
import { defineStore } from 'pinia'

const plantsName = ref([])

export const usePlantStore = defineStore('plants', () => {
  const axios = inject('$axios')

  const plantsData = async () => {
    try {
      const response = await axios.get('/data')
      plantsName.value = response.data
      return plantsName.value.map((item) => item.gardenList)
    } catch (err) {
      console.log(err)
    }
  }
})
